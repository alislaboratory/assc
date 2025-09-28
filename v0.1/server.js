const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database setup
const dbPath = path.join(__dirname, 'conference.db');
const db = new sqlite3.Database(dbPath);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'delegate.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API Routes
app.get('/api/events', (req, res) => {
  const { day } = req.query;
  let query = 'SELECT * FROM events';
  let params = [];
  
  if (day) {
    query += ' WHERE day = ?';
    params.push(day);
  }
  
  query += ' ORDER BY day, time';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/events/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM events WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }
    res.json(row);
  });
});

app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const { name, time, location, organizer, type, day } = req.body;
  
  // Validate required fields
  if (!name || !time || !location || !organizer || !type || !day) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }
  
  const query = `UPDATE events 
                 SET name = ?, time = ?, location = ?, organizer = ?, type = ?, day = ?, updated_at = CURRENT_TIMESTAMP 
                 WHERE id = ?`;
  
  db.run(query, [name, time, location, organizer, type, day, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Get updated event and broadcast to all clients
    db.get('SELECT * FROM events WHERE id = ?', [id], (err, row) => {
      if (!err && row) {
        io.emit('event_updated', row);
      }
    });
    
    res.json({ message: 'Event updated successfully', changes: this.changes });
  });
});

app.post('/api/events', (req, res) => {
  const { name, time, location, organizer, type, day } = req.body;
  
  // Validate required fields
  if (!name || !time || !location || !organizer || !type || !day) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }
  
  const query = `INSERT INTO events (name, time, location, organizer, type, day) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.run(query, [name, time, location, organizer, type, day], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // Get new event and broadcast to all clients
    db.get('SELECT * FROM events WHERE id = ?', [this.lastID], (err, row) => {
      if (!err && row) {
        io.emit('event_created', row);
      }
    });
    
    res.status(201).json({ 
      message: 'Event created successfully', 
      id: this.lastID 
    });
  });
});

app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM events WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    if (this.changes === 0) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }
    
    // Broadcast deletion to all clients
    io.emit('event_deleted', { id: parseInt(id) });
    
    res.json({ message: 'Event deleted successfully' });
  });
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('👤 Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('👋 Client disconnected:', socket.id);
  });
  
  // Send current events to newly connected client
  db.all('SELECT * FROM events ORDER BY day, time', (err, rows) => {
    if (!err) {
      socket.emit('events_loaded', rows);
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 ASSC Live Timetabling Server running on port ${PORT}`);
  console.log(`📱 Delegate view: http://localhost:${PORT}`);
  console.log(`⚙️  Admin panel: http://localhost:${PORT}/admin`);
  console.log(`📊 API docs: http://localhost:${PORT}/api/events`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('✅ Database connection closed');
    }
    process.exit(0);
  });
});
