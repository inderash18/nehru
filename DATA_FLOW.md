# LifeLink - Data Flow Architecture

## 🔄 Complete Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                    (React Frontend - Port 5177)                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests (Axios)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API LAYER                               │
│                    (FastAPI Backend - Port 8000)                │
│                                                                 │
│  Endpoints:                                                     │
│  • POST /api/auth/register  → Register new user                │
│  • POST /api/auth/login     → Authenticate user                │
│  • GET  /api/auth/me        → Get current user                 │
│  • GET  /api/public/stocks  → Get blood stocks                 │
│  • POST /api/blood/request  → Create blood request             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ MongoDB Driver (Motor)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                             │
│                  (MongoDB - Port 27017)                         │
│                                                                 │
│  Database: blood_donation_db                                    │
│                                                                 │
│  Collections:                                                   │
│  ├── users           → All registered users                    │
│  ├── blood_inventory → Blood inventory data (Use this!)        │
│  ├── donations       → Donation history                        │
│  ├── requests        → Emergency blood requests                │
│  └── appointments    → Scheduled donations                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ View/Manage
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MONGODB COMPASS                            │
│                    (GUI Database Tool)                          │
│                                                                 │
│  • View all collections                                         │
│  • Query data                                                   │
│  • Edit documents                                               │
│  • Monitor database                                             │
└─────────────────────────────────────────────────────────────────┘
```

## 📝 Registration Flow Example

```
1. USER fills registration form
   ↓
2. Frontend sends POST to /api/auth/register
   {
     "full_name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "phone": "+91 1234567890",
     "blood_type": "O+",
     "address": {"city": "Mumbai", "state": "Maharashtra"},
     "role": "donor"
   }
   ↓
3. Backend validates data
   ↓
4. Backend hashes password
   ↓
5. Backend saves to MongoDB users collection
   {
     "_id": ObjectId("..."),
     "full_name": "John Doe",
     "email": "john@example.com",
     "password_hash": "$2b$12$...",
     "phone": "+91 1234567890",
     "blood_type": "O+",
     "address": {"city": "Mumbai", "state": "Maharashtra"},
     "role": "donor",
     "is_verified": true,
     "created_at": "2026-02-05T18:13:57Z"
   }
   ↓
6. Backend returns user data (without password)
   ↓
7. Frontend shows success message
   ↓
8. User can now login!
```

## 🔐 Login Flow Example

```
1. USER enters email & password
   ↓
2. Frontend sends POST to /api/auth/login
   ↓
3. Backend finds user in MongoDB
   ↓
4. Backend verifies password hash
   ↓
5. Backend creates JWT token
   ↓
6. Frontend receives token
   ↓
7. Frontend stores token in localStorage
   ↓
8. Frontend includes token in all future requests
   ↓
9. User is authenticated!
```

## 🩸 Blood Stock Flow Example

```
1. USER visits dashboard
   ↓
2. Frontend sends GET to /api/public/stocks
   ↓
3. Backend queries MongoDB blood_stocks collection
   ↓
4. Backend returns array of blood stocks
   [
     {"blood_type": "A+", "units": 45, "status": "adequate"},
     {"blood_type": "O-", "units": 8, "status": "critical"},
     ...
   ]
   ↓
5. Frontend displays BloodStockCard components
   ↓
6. USER sees real-time blood availability!
```

## 🔄 Real-time Updates (WebSocket)

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Admin     │         │   Backend   │         │   Donor     │
│  Updates    │         │  WebSocket  │         │  Dashboard  │
│   Stock     │         │   Server    │         │             │
└─────────────┘         └─────────────┘         └─────────────┘
       │                       │                       │
       │ POST /blood/update    │                       │
       │──────────────────────>│                       │
       │                       │                       │
       │                       │ Save to MongoDB       │
       │                       │──────────────────>    │
       │                       │                       │
       │                       │ Broadcast update      │
       │                       │──────────────────────>│
       │                       │                       │
       │                       │                  UI Updates!
```

## 📊 Data Storage Details

### User Document Example (MongoDB)
```json
{
  "_id": ObjectId("65c1234567890abcdef12345"),
  "full_name": "John Doe",
  "email": "john@example.com",
  "password_hash": "$2b$12$KIXxFz...",
  "phone": "+91 9876543210",
  "blood_type": "O+",
  "address": {
    "city": "Mumbai",
    "state": "Maharashtra"
  },
  "role": "donor",
  "is_verified": true,
  "created_at": ISODate("2026-02-05T18:13:57.000Z")
}
```

### Blood Stock Document Example
```json
{
  "_id": ObjectId("65c1234567890abcdef12346"),
  "blood_type": "A+",
  "units": 45,
  "status": "adequate",
  "blood_bank_id": ObjectId("..."),
  "last_updated": ISODate("2026-02-05T18:13:57.000Z")
}
```

## ✅ Verification Steps

1. **Start MongoDB** → Check in Compass
2. **Start Backend** → Visit http://localhost:8000
3. **Start Frontend** → Visit http://localhost:5177
4. **Register User** → Fill form and submit
5. **Check Database** → Open Compass → See user in `users` collection
6. **Login** → Use registered credentials
7. **View Dashboard** → See dynamic data from database

---

**All data is stored in MongoDB and can be viewed in MongoDB Compass!**
