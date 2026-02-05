from fastapi import APIRouter, HTTPException
from ..database.mongodb import get_database
from ..models.schemas import BloodInventoryBase
from ..websocket.manager import broadcast_stock_update
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.post("/inventory")
async def update_inventory(item: BloodInventoryBase):
    db = get_database()
    
    status = "adequate"
    if item.units <= item.threshold:
        status = "low"
    if item.units <= item.threshold / 2:
        status = "critical"
        
    doc = item.dict()
    doc["status"] = status
    doc["last_updated"] = datetime.utcnow()
    
    await db.blood_inventory.update_one(
        {"blood_type": item.blood_type, "location": item.location},
        {"$set": doc},
        upsert=True
    )
    
    # Broadcast to websocket
    await broadcast_stock_update({"blood_type": item.blood_type, "units": item.units, "status": status})
    
    return {"message": "Inventory updated"}

@router.get("/donations/{donor_id}")
async def get_donor_history(donor_id: str):
    db = get_database()
    donations = await db.donations.find({"donor_id": donor_id}).to_list(100)
    for d in donations:
        d["_id"] = str(d["_id"])
    return donations
