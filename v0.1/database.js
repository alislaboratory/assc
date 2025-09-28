const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database file
const dbPath = path.join(__dirname, 'conference.db');
const db = new sqlite3.Database(dbPath);

// Create events table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    organizer TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('workshop', 'speaker')),
    day INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert demo data
  const demoEvents = [
    // Day 1
    { name: 'Surgical Techniques Workshop', time: '09:00', location: 'Main Hall', organizer: 'Dr. Sarah Chen', type: 'workshop', day: 1 },
    { name: 'Keynote: Future of Surgery', time: '10:30', location: 'Auditorium', organizer: 'Prof. Michael Torres', type: 'speaker', day: 1 },
    { name: 'Laparoscopic Skills Lab', time: '14:00', location: 'Lab 1', organizer: 'Dr. Emma Wilson', type: 'workshop', day: 1 },
    { name: 'Research Presentation', time: '15:30', location: 'Conference Room A', organizer: 'Dr. James Park', type: 'speaker', day: 1 },
    { name: 'Suturing Masterclass', time: '16:45', location: 'Lab 2', organizer: 'Dr. Lisa Zhang', type: 'workshop', day: 1 },
    
    // Day 2
    { name: 'Trauma Surgery Workshop', time: '09:00', location: 'Main Hall', organizer: 'Dr. Robert Kim', type: 'workshop', day: 2 },
    { name: 'Plenary: Innovation in Medicine', time: '10:30', location: 'Auditorium', organizer: 'Prof. Anna Rodriguez', type: 'speaker', day: 2 },
    { name: 'Microsurgery Techniques', time: '14:00', location: 'Lab 1', organizer: 'Dr. David Lee', type: 'workshop', day: 2 },
    { name: 'Case Study Discussion', time: '15:30', location: 'Conference Room B', organizer: 'Dr. Maria Santos', type: 'speaker', day: 2 },
    { name: 'Emergency Procedures', time: '16:45', location: 'Lab 2', organizer: 'Dr. Alex Thompson', type: 'workshop', day: 2 },
    
    // Day 3
    { name: 'Cardiovascular Surgery', time: '09:00', location: 'Main Hall', organizer: 'Dr. Jennifer Liu', type: 'workshop', day: 3 },
    { name: 'Closing Keynote', time: '10:30', location: 'Auditorium', organizer: 'Prof. William Brown', type: 'speaker', day: 3 },
    { name: 'Robotic Surgery Demo', time: '14:00', location: 'Lab 1', organizer: 'Dr. Sophie Martin', type: 'workshop', day: 3 },
    { name: 'Research Symposium', time: '15:30', location: 'Conference Room A', organizer: 'Dr. Kevin O\'Connor', type: 'speaker', day: 3 },
    { name: 'Surgical Innovation Panel', time: '16:45', location: 'Main Hall', organizer: 'Dr. Rachel Green', type: 'speaker', day: 3 }
  ];

  // Clear existing data and insert demo data
  db.run('DELETE FROM events');
  
  const stmt = db.prepare(`INSERT INTO events (name, time, location, organizer, type, day) 
                          VALUES (?, ?, ?, ?, ?, ?)`);
  
  demoEvents.forEach(event => {
    stmt.run([event.name, event.time, event.location, event.organizer, event.type, event.day]);
  });
  
  stmt.finalize();
  
  console.log('✅ Database initialized with demo data');
  console.log(`📁 Database file: ${dbPath}`);
});

db.close();
