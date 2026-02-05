from fastapi import APIRouter
from ..database.mongodb import get_database
from typing import List, Dict, Optional
import random

router = APIRouter()

@router.get("/blood-stock")
async def get_blood_stock():
    db = get_database()
    pipeline = [
        {"$group": {
            "_id": "$blood_type",
            "units": {"$sum": "$units"}
        }}
    ]
    aggregated = await db.blood_inventory.aggregate(pipeline).to_list(100)
    
    # Format and add status
    result = []
    for item in aggregated:
        units = item["units"]
        status = "adequate"
        if units < 10:
            status = "critical"
        elif units < 30:
            status = "low"
            
        result.append({
            "blood_type": item["_id"],
            "units": units,
            "status": status
        })
    return result

@router.get("/stats")
async def get_stats():
    db = get_database()
    active_donors = await db.users.count_documents({"role": "donor"})
    total_donations = await db.donations.count_documents({})
    emergency_requests = await db.alerts.count_documents({"type": "emergency", "is_active": True})
    
    return {
        "donations_today": total_donations,
        "lives_saved": total_donations * 3, # Typical medical estimate
        "active_donors": active_donors,
        "emergency_requests": emergency_requests
    }

@router.get("/alerts")
async def get_active_alerts():
    db = get_database()
    alerts = await db.alerts.find({"is_active": True}).to_list(10)
    for a in alerts:
        a["_id"] = str(a["_id"])
    return alerts

@router.get("/health")
async def health_check():
    db = get_database()
    try:
        await db.command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": str(e)}

@router.get("/locations")
async def get_locations():
    db = get_database()
    pipeline = [
        {"$group": {
            "_id": "$location",
            "lat": {"$first": "$lat"},
            "lng": {"$first": "$lng"},
            "blood_types_available": {"$push": "$blood_type"},
            "total_units": {"$sum": "$units"}
        }}
    ]
    locations = await db.blood_inventory.aggregate(pipeline).to_list(100)
    
    # Format for frontend
    result = []
    for loc in locations:
        result.append({
            "id": loc["_id"],
            "name": loc["_id"],
            "lat": loc.get("lat", 40.7128 + random.uniform(-0.1, 0.1)),
            "lng": loc.get("lng", -74.0060 + random.uniform(-0.1, 0.1)),
            "status": "Adequate" if loc["total_units"] > 50 else "Low",
            "address": f"Location at {loc['_id']}"
        })
        
    return result
