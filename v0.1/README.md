# ASSC 2026 Live Timetabling - Demo Prototype

A simple, real-time conference timetabling system for the Australasian Students' Surgical Conference 2026.

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation & Setup

1. **Install dependencies:**
   ```bash
   cd v0.1
   npm install
   ```

2. **Initialize database with demo data:**
   ```bash
   npm run setup
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Access the application:**
   - **Delegate View**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin
   - **API**: http://localhost:3000/api/events

## 🌐 Demo with External Access

To share with your team (requires ngrok):

1. **Install ngrok:**
   ```bash
   # macOS
   brew install ngrok
   
   # Or download from https://ngrok.com/
   ```

2. **Start your server:**
   ```bash
   npm start
   ```

3. **Expose to internet:**
   ```bash
   ngrok http 3000
   ```

4. **Share the ngrok URL** (e.g., `https://abc123.ngrok.io`)

## 📱 Features

### For Delegates
- **Live Schedule View** - See all conference events in real-time
- **Day Filtering** - View events by day (Day 1, 2, 3)
- **Real-time Updates** - Schedule changes appear instantly
- **Mobile Responsive** - Works on phones and tablets

### For Logistics Team (Admin)
- **Simple Admin Panel** - Easy-to-use interface
- **Add Events** - Create new workshops and speaker sessions
- **Edit Events** - Update times, locations, organizers
- **Delete Events** - Remove events from schedule
- **Live Updates** - Changes appear immediately for delegates

### Demo Data Included
- **15 sample events** across 3 conference days
- **Mix of workshops and speaker sessions**
- **Realistic medical conference content**
- **Various times and locations**

## 🛠️ API Endpoints

- `GET /api/events` - Get all events
- `GET /api/events?day=1` - Get events for specific day
- `GET /api/events/:id` - Get specific event
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

## 📊 Data Structure

Each event contains:
```json
{
  "id": 1,
  "name": "Surgical Techniques Workshop",
  "time": "09:00",
  "location": "Main Hall",
  "organizer": "Dr. Sarah Chen",
  "type": "workshop",
  "day": 1,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

## 🔧 Development

### File Structure
```
v0.1/
├── server.js          # Main Express server
├── database.js        # Database setup and demo data
├── package.json       # Dependencies and scripts
├── code.md           # Technical documentation
├── public/           # Frontend files
│   ├── admin.html    # Admin panel interface
│   ├── delegate.html # Delegate view
│   ├── style.css     # Shared styles
│   └── app.js        # Client-side JavaScript
└── conference.db     # SQLite database (created on setup)
```

### Scripts
- `npm start` - Start the server
- `npm run dev` - Start with auto-reload (requires nodemon)
- `npm run setup` - Initialize database with demo data

## 🚀 Deployment Options

### For Production Demo
1. **Railway** (Recommended)
   - Connect GitHub repository
   - Automatic deployments
   - Free tier available

2. **Render**
   - Deploy from GitHub
   - Free tier: 750 hours/month
   - Custom domains

3. **Vercel**
   - Serverless deployment
   - Free tier available
   - Global CDN

### For Full Production
- **VPS** (DigitalOcean, Linode, etc.)
- **Custom domain** with SSL
- **Database backups**
- **Monitoring and logging**

## 🔒 Security Notes

- **Demo version** has no authentication
- **Production version** should include:
  - Admin panel authentication
  - Input validation
  - Rate limiting
  - HTTPS/SSL certificates

## 📞 Support

For questions or issues:
1. Check the `code.md` file for technical details
2. Review the API endpoints above
3. Check server logs for error messages

## 🎯 Next Steps

1. **Test the demo** with your team
2. **Customize** event types and data structure
3. **Deploy** to a persistent hosting service
4. **Add authentication** for production use
5. **Integrate** with your Squarespace website

---

**Ready to demo!** 🎉
