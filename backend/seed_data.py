import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.security import get_password_hash
from app.config import settings
from datetime import datetime, timedelta
import random

# Reuse the connection logic from config but strictly for this script
MONGODB_URL = settings.MONGODB_URL
DATABASE_NAME = settings.DATABASE_NAME

async def seed_data():
    print(f"Connecting to MongoDB at {MONGODB_URL}...")
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    print("Dropping existing collections...")
    await db.users.drop()
    await db.blood_inventory.drop()
    await db.donations.drop()
    await db.alerts.drop()

    print("Seeding Users...")
    users = [
        {
            "email": "admin@lifelink.com",
            "password": "admin",
            "full_name": "Super Admin",
            "phone": "9876543210",
            "role": "admin",
            "blood_type": "O+",
            "address": {"city": "New York", "state": "NY", "zip": "10001"}
        },
        {
            "email": "donor1@gmail.com",
            "password": "password",
            "full_name": "John Doe",
            "phone": "1234567890",
            "role": "donor",
            "blood_type": "A+",
            "address": {"city": "Brooklyn", "state": "NY", "zip": "11201"}
        },
        {
            "email": "donor2@gmail.com",
            "password": "password",
            "full_name": "Jane Smith",
            "phone": "5555555555",
            "role": "donor",
            "blood_type": "O-",
            "address": {"city": "Queens", "state": "NY", "zip": "11375"}
        }
    ]
    
    # Helper to create user doc with hash
    user_docs = []
    for u in users:
        pw = u.pop("password")
        u["password_hash"] = get_password_hash(pw)
        u["is_verified"] = True
        u["created_at"] = datetime.utcnow()
        user_docs.append(u)
    
    await db.users.insert_many(user_docs)
    print(f"Inserted {len(user_docs)} users.")

    print("Seeding Blood Inventory...")
    # Locations
    locations = [
        {"name": "Central Blood Bank", "lat": 40.7128, "lng": -74.0060},
        {"name": "City General Hospital", "lat": 40.7306, "lng": -73.9352},
        {"name": "Westside Clinic", "lat": 40.7589, "lng": -73.9851},
        {"name": "Brooklyn Medical Center", "lat": 40.6782, "lng": -73.9442},
        {"name": "Queens Community Hospital", "lat": 40.7282, "lng": -73.7949}
    ]
    
    blood_types = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    
    inventory_docs = []
    
    for loc in locations:
        for b_type in blood_types:
            units = random.randint(5, 100)
            threshold = 20
            status = "adequate"
            if units < threshold:
                status = "low"
            if units < 10:
                status = "critical"
                
            inventory_docs.append({
                "blood_type": b_type,
                "units": units,
                "threshold": threshold,
                "location": loc["name"],
                "lat": loc["lat"],
                "lng": loc["lng"],
                "status": status,
                "last_updated": datetime.utcnow()
            })
            
    await db.blood_inventory.insert_many(inventory_docs)
    print(f"Inserted {len(inventory_docs)} inventory records across {len(locations)} locations.")
    
    print("Seeding Donations...")
    # Find donor ids
    donors = await db.users.find({"role": "donor"}).to_list(100)
    
    donation_docs = []
    for _ in range(20):
        donor = random.choice(donors)
        donation_docs.append({
            "donor_id": str(donor["_id"]),
            "blood_type": donor["blood_type"],
            "units": 1,
            "location": random.choice(locations)["name"],
            "donation_date": datetime.utcnow() - timedelta(days=random.randint(1, 365)),
            "status": "completed"
        })
        
    await db.donations.insert_many(donation_docs)
    print(f"Inserted {len(donation_docs)} donation records.")
    
    print("Seeding Alerts...")
    alerts = [
        {
            "type": "emergency",
            "blood_type": "O-",
            "message": "Urgent need for O- blood at City General!",
            "severity": "critical",
            "is_active": True,
            "created_at": datetime.utcnow()
        },
        {
            "type": "shortage",
            "blood_type": "AB-",
            "message": "Low stock alert for AB- in Brooklyn.",
            "severity": "warning",
            "is_active": True,
            "created_at": datetime.utcnow() - timedelta(hours=2)
        }
    ]
    await db.alerts.insert_many(alerts)
    print(f"Inserted {len(alerts)} alerts.")

    print("Seed complete! You can now check MongoDB Compass.")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_data())
