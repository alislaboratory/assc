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

### Recent Changes (v0.1.2)

#### "What's on Now" and "What's on Next" Panels
**File: `public/delegate.html`**

- **Added Now/Next Panels** to delegate view:
  - Two side-by-side panels showing current and upcoming events
  - Responsive grid layout (stacks on mobile)
  - Positioned between Quick Links and main schedule

- **Time-based Logic Implementation:**
  - `updateNowNext()` - Main function that determines current/next events
  - `findCurrentEvent()` - Finds events currently running (90-minute duration assumed)
  - `findNextEvent()` - Finds next upcoming event
  - `calculateTimeRemaining()` - Shows time left in current event
  - `calculateTimeUntil()` - Shows time until next event starts

- **Smart Event Detection:**
  - Uses current system time to determine what's happening now
  - Assumes 90-minute event duration for realistic conference timing
  - Maps current day of week to conference day (1-3) for demo purposes
  - Sorts events by time for accurate next-event detection

- **Fun Messages for Breaks:**
  - 6 different encouraging messages when no events are running:
    - "☕ Coffee break time! Rest easy and recharge."
    - "🌱 Take a moment to breathe and network."
    - "💭 Perfect time for reflection and discussion."
    - "🤝 Great opportunity to connect with fellow delegates."
    - "📚 Catch up on notes or explore the venue."
    - "🍃 Enjoy this peaceful moment between sessions."
  - Random selection for variety and engagement

- **Visual Design Features:**
  - Live indicator with pulsing animation for current events
  - Gradient backgrounds matching color scheme
  - Event type icons (🔧 workshops, 🎤 speakers)
  - Time remaining/until calculations with smart formatting
  - Mobile-responsive grid layout

- **Auto-update Functionality:**
  - Updates every minute via `setInterval(updateNowNext, 60000)`
  - Updates on schedule refresh and WebSocket events
  - Real-time synchronization with admin changes

#### Technical Implementation Details
- **Time Calculations:** Uses JavaScript Date objects for accurate time handling
- **Event Duration:** Configurable 90-minute default (can be made dynamic)
- **Day Mapping:** Simple day-of-week to conference-day mapping for demo
- **Performance:** Efficient filtering and sorting of events
- **Error Handling:** Graceful fallbacks when no events found
- **Responsive Design:** CSS Grid with mobile breakpoint

### Future Enhancements
- User authentication for admin panel
- Event categories and filtering
- Mobile app integration
- Export functionality for schedules
- Integration with calendar systems
