# ASSC 2026 Live Timetabling - Code Documentation

## Architecture Overview

This is a simple, maintainable prototype for live conference timetabling with the following design principles:

### Core Requirements
- **Real-time updates** when logistics team changes events
- **Simple admin panel** for non-technical team members
- **Delegate view** showing current schedule
- **Demo data** for immediate testing
- **Easy deployment** and maintenance

### Tech Stack
- **Backend**: Node.js + Express.js
- **Database**: SQLite (file-based, no server setup)
- **Real-time**: Socket.io for WebSocket connections
- **Frontend**: Vanilla HTML/CSS/JS (no frameworks for simplicity)
- **Hosting**: Designed for local development + ngrok for demos

### Data Structure
Each event contains:
- `id` - Unique identifier
- `name` - Event/workshop name
- `time` - Event time (HH:MM format)
- `location` - Room/venue name
- `organizer` - Person organizing the event
- `type` - 'workshop' or 'speaker'
- `day` - Conference day (1, 2, 3, etc.)

### File Structure
```
v0.1/
├── code.md              # This documentation
├── package.json         # Dependencies and scripts
├── server.js           # Main Express server
├── database.js         # SQLite database setup
├── public/             # Static files
│   ├── admin.html      # Admin panel interface
│   ├── delegate.html   # Delegate view example
│   ├── style.css       # Shared styles
│   └── app.js          # Client-side JavaScript
└── README.md           # Setup instructions
```

### API Endpoints
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get specific event
- `PUT /api/events/:id` - Update event
- `POST /api/events` - Create new event
- `DELETE /api/events/:id` - Delete event

### Real-time Updates
- WebSocket connection via Socket.io
- Server broadcasts changes to all connected clients
- Automatic reconnection on connection loss

### Security Considerations
- No authentication for demo (add later for production)
- CORS enabled for cross-origin requests
- Input validation on server side

### Deployment Strategy
1. **Demo**: Run locally + ngrok tunnel
2. **Staging**: Deploy to Railway/Render free tier
3. **Production**: VPS with proper domain and SSL

### Maintenance Notes
- SQLite database file can be backed up by copying
- All configuration in server.js
- Easy to add new fields to events table
- Client-side code is framework-free for easy customization

### Recent Changes (v0.1.1)

#### UI/UX Improvements
**File: `public/delegate.html`**
- **Removed "All Days" option** from delegate view day tabs
  - Changed default selected day from 'all' to '1'
  - Updated filtering logic to only show events for selected day
  - Simplified user experience for attendees

- **Moved Quick Links section** to top of delegate page
  - Relocated from bottom to after connection status
  - Improved navigation accessibility

**File: `public/style.css`**
- **Updated color scheme** to rose-red and orchid-pink palette:
  - Added CSS custom properties for consistent theming
  - `--white: #FFFFFF`
  - `--rose-red: #B53757`
  - `--orchid-pink: #E3AFBC`
  - `--light-pink: #F5E6EA`
  - `--dark-rose: #8B2A42`
  
- **Applied new colors throughout:**
  - Header gradient: rose-red to orchid-pink
  - Event cards: rose-red borders, orchid-pink for workshops
  - Buttons: rose-red primary, orchid-pink secondary
  - Day tabs: orchid-pink borders, rose-red active state
  - Status indicators: rose-red online, dark-rose offline
  - Alerts: light-pink success, rose-red error

- **Added serif typography:**
  - Imported Google Fonts: Abril Fatface and Alegreya
  - Header titles: Abril Fatface (display font)
  - Body text: Alegreya (readable serif)
  - Maintained professional medical conference aesthetic

**File: `public/delegate.html` (inline styles)**
- **Updated event type badges** to match new color scheme:
  - Workshop badges: orchid-pink background, dark-rose text
  - Speaker badges: dark-rose background, white text

#### Technical Notes
- All color changes use CSS custom properties for maintainability
- Font imports added to top of style.css for performance
- Changes maintain accessibility and contrast ratios
- Mobile responsiveness preserved across all updates

### Future Enhancements
- User authentication for admin panel
- Event categories and filtering
- Mobile app integration
- Export functionality for schedules
- Integration with calendar systems
