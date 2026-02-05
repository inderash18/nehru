from fastapi import APIRouter
from ..database.mongodb import get_database
from typing import List, Dict
import random

router = APIRouter()

@router.get("/blood-stock")
async def get_blood_stock():
    db = get_database()
    stocks = await db.blood_inventory.find().to_list(100)
    for s in stocks:
        s["_id"] = str(s["_id"])
    return stocks

@router.get("/stats")
async def get_stats():
    # Return some mock/real stats
    return {
        "donations_today": 42,
        "lives_saved": 1250,
        "active_donors": 850,
        "emergency_requests": 3
    }

@router.get("/alerts")
async def get_active_alerts():
    db = get_database()
    alerts = await db.alerts.find({"is_active": True}).to_list(10)
    for a in alerts:
        a["_id"] = str(a["_id"])
    return alerts

@router.get("/locations")
async def get_locations():
    return [
        {"id": 1, "name": "Main Blood Bank", "lat": 40.7128, "lng": -74.0060, "address": "123 Health Ave, NY"},
        {"id": 2, "name": "City General Hospital", "lat": 40.7306, "lng": -73.9352, "address": "456 Care St, NY"},
    ]
