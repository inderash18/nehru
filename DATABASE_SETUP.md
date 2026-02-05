# LifeLink - Dynamic Database Setup Guide

## 🗄️ MongoDB Setup

### 1. Install MongoDB
- Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
- Install MongoDB Compass (GUI tool) from: https://www.mongodb.com/try/download/compass

### 2. Start MongoDB Service
**Windows:**
```bash
# Start MongoDB service
net start MongoDB

# Or run manually:
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"
```

**Check if MongoDB is running:**
- Open MongoDB Compass
- Connect to: `mongodb://localhost:27017`
- You should see the connection successful

## 🚀 Backend Setup

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Start Backend Server
```bash
# From the nehru directory:
.\start-backend.bat

# Or manually:
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

### 3. Verify Backend is Running
- Open browser: http://localhost:8000
- You should see: `{"message": "Welcome to LifeLink AI API"}`
- API Docs: http://localhost:8000/docs

## 💻 Frontend Setup

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Access Application
- Open browser: http://localhost:5177

## ✅ Testing the Dynamic System

### 1. Register a New User
1. Go to http://localhost:5177/register
2. Fill in the registration form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: password123
   - Phone: +91 1234567890
   - State: Maharashtra
   - Blood Type: O+
3. Click "Create Account"

### 2. Verify in MongoDB Compass
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Navigate to: `blood_donation_db` → `users`
4. You should see your registered user data!

### 3. Login with Registered User
1. Go to http://localhost:5177/login
2. Enter:
   - Email: test@example.com
   - Password: password123
3. Click "Sign In"
4. You should be redirected to the donor dashboard

## 📊 Database Collections

The system uses these MongoDB collections:

- **users** - All registered users (donors, admins, blood banks)
- **blood_stocks** - Blood inventory data
- **donations** - Donation history
- **requests** - Emergency blood requests
- **appointments** - Scheduled donation appointments

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: Failed to connect to MongoDB
```
**Solution:**
1. Make sure MongoDB service is running
2. Check MongoDB Compass can connect to `mongodb://localhost:27017`
3. Restart MongoDB service

### Backend CORS Error
```
Error: CORS policy blocked
```
**Solution:**
- Backend is already configured for ports 5173-5177
- Make sure backend is running on port 8000

### Frontend API Error
```
Error: Network Error
```
**Solution:**
1. Check backend is running: http://localhost:8000
2. Check browser console for detailed error
3. Verify API URL in `.env` file (if exists)

## 🎯 Current Status

✅ **Backend**: Configured to save all data to MongoDB  
✅ **Frontend**: Configured to fetch data from backend API  
✅ **Database**: MongoDB ready to store all registration data  
✅ **CORS**: Configured for ports 5173-5177  

## 📝 Next Steps

1. Start MongoDB service
2. Start backend server (port 8000)
3. Start frontend server (port 5177)
4. Register a new user
5. Check MongoDB Compass to see the data!

---

**Note**: All registration data is automatically saved to MongoDB. You can view and manage all data using MongoDB Compass.
