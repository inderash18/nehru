from fastapi import APIRouter
from ..database.mongodb import get_database
from datetime import datetime

router = APIRouter()

@router.get("/active")
async def get_active_alerts():
    db = get_database()
    alerts = await db.alerts.find({"is_active": True}).to_list(10)
    for a in alerts:
        a["_id"] = str(a["_id"])
    return alerts
