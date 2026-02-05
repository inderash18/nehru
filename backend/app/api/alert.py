from fastapi import APIRouter, Depends
from ..database.mongodb import get_database
from ..models.schemas import AlertBase
from ..websocket.manager import broadcast_emergency
from datetime import datetime

router = APIRouter()

@router.post("/broadcast")
async def broadcast_alert(alert: AlertBase):
    db = get_database()
    alert_dict = alert.dict()
    alert_dict["is_active"] = True
    alert_dict["created_at"] = datetime.utcnow()
    
    result = await db.alerts.insert_one(alert_dict)
    alert_dict["id"] = str(result.inserted_id)
    
    # Send real-time broadcast via WS
    await broadcast_emergency(alert_dict)
    
    return alert_dict

@router.get("/active")
async def get_active_alerts():
    db = get_database()
    alerts = await db.alerts.find({"is_active": True}).to_list(10)
    for a in alerts:
        a["_id"] = str(a["_id"])
    return alerts
