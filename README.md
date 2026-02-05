# 🩸 LifeLink - Blood Donation Management System

A modern, dynamic blood donation platform with real-time coordination and MongoDB database integration.

## 🎯 Features

- ✅ **Dynamic Database** - All data stored in MongoDB
- ✅ **User Registration** - Complete donor/admin registration
- ✅ **Real-time Updates** - Live blood stock tracking
- ✅ **Emergency Requests** - Quick blood request system
- ✅ **Clean UI** - Simple, modern interface
- ✅ **Secure Authentication** - JWT-based auth system

## 🚀 Quick Start

### Prerequisites
- **MongoDB** - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- **MongoDB Compass** - GUI tool for viewing database
- **Python 3.8+** - For backend
- **Node.js 16+** - For frontend

### One-Click Start
```bash
# Run this to start everything:
START_ALL.bat
```

This will:
1. Start the backend server (port 8000)
2. Start the frontend server (port 5177)
3. Open the application in your browser

### Manual Start

**1. Start MongoDB**
```bash
net start MongoDB
# Or open MongoDB Compass and connect to mongodb://localhost:27017
```

**2. Start Backend**
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

**3. Start Frontend**
```bash
cd client
npm run dev
```

**4. Open Application**
- Frontend: http://localhost:5177
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📊 Database Integration

### How It Works

1. **User Registration**
   - User fills form on `/register`
   - Data sent to backend API
   - Backend saves to MongoDB `users` collection
   - User can login immediately

2. **View Data in MongoDB Compass**
   - Open MongoDB Compass
   - Connect to `mongodb://localhost:27017`
   - Navigate to `blood_donation_db` → `users`
   - See all registered users!

### Collections

- `users` - All registered users
- `blood_stocks` - Blood inventory
- `donations` - Donation history
- `requests` - Emergency requests
- `appointments` - Scheduled donations

## 🧪 Testing

### Test Backend Connection
```bash
python test_backend.py
```

This will:
- Check if backend is running
- Test registration endpoint
- Test login endpoint
- Verify MongoDB connection

### Manual Testing

1. **Register a User**
   - Go to http://localhost:5177/register
   - Fill in all fields
   - Click "Create Account"

2. **Verify in Database**
   - Open MongoDB Compass
   - Check `blood_donation_db` → `users`
   - Your user should be there!

3. **Login**
   - Go to http://localhost:5177/login
   - Use your registered email/password
   - You'll be redirected to dashboard

## 📁 Project Structure

```
nehru/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── database/       # MongoDB connection
│   │   ├── models/         # Data models
│   │   └── main.py         # App entry point
│   └── requirements.txt
├── client/                  # React frontend
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── services/       # API services
│   │   └── contexts/       # React contexts
│   └── package.json
├── START_ALL.bat           # Quick start script
├── test_backend.py         # Backend test script
└── DATABASE_SETUP.md       # Detailed setup guide
```

## 🔧 Configuration

### Backend (.env)
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=blood_donation_db
SECRET_KEY=your-secret-key
```

### Frontend
API URL is configured in `client/src/services/api.js`:
```javascript
baseURL: 'http://127.0.0.1:8000/api'
```

## 🛠️ Troubleshooting

### MongoDB Not Running
```bash
# Start MongoDB service
net start MongoDB

# Or check in MongoDB Compass
# Connect to: mongodb://localhost:27017
```

### Backend Error
```bash
# Check if port 8000 is available
# Restart backend server
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

### Frontend Error
```bash
# Clear cache and restart
cd client
rm -rf node_modules
npm install
npm run dev
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Blood Management
- `GET /api/public/stocks` - Get blood stocks
- `POST /api/blood/request` - Create blood request
- `GET /api/donor/profile` - Get donor profile

## 🎨 Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Axios
- React Router

**Backend:**
- FastAPI
- MongoDB (Motor)
- JWT Authentication
- Python 3.8+

## 📖 Documentation

- [Database Setup Guide](DATABASE_SETUP.md) - Detailed MongoDB setup
- [API Documentation](http://localhost:8000/docs) - Interactive API docs (when backend is running)

## ✅ Current Status

- ✅ Backend configured for MongoDB
- ✅ Frontend connected to backend API
- ✅ Registration saves to database
- ✅ Login authentication working
- ✅ Dynamic data loading
- ✅ Clean, simple UI

## 🎯 Next Steps

1. Run `START_ALL.bat` to start everything
2. Register a new user
3. Check MongoDB Compass to see the data
4. Login with your credentials
5. Explore the dashboard!

---

**Made with ❤️ for saving lives**
