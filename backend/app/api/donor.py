from fastapi import APIRouter
from ..database.mongodb import get_database

router = APIRouter()

@router.get("/profile/{user_id}")
async def get_donor_profile(user_id: str):
    db = get_database()
    user = await db.users.find_one({"_id": user_id})
    if user:
        user["_id"] = str(user["_id"])
    return user
