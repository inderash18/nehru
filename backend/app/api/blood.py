from fastapi import APIRouter, HTTPException, Depends
from .auth import get_current_user
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

@router.get("/inventory")
async def get_inventory(location: str = "Central Blood Bank"):
    db = get_database()
    cursor = db.blood_inventory.find({"location": location})
    inventory = await cursor.to_list(length=100)
    for item in inventory:
        item["_id"] = str(item["_id"])
    return inventory

@router.get("/donations")
async def get_my_history(current_user: dict = Depends(get_current_user)):
    db = get_database()
    donations = await db.donations.find({"donor_id": current_user["id"]}).to_list(100)
    for d in donations:
        d["_id"] = str(d["_id"])
    return donations
