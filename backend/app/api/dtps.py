from fastapi import APIRouter, Depends
from ..database.mongodb import get_database
from ..ml.dtps_model import get_ml_score
from ..models.schemas import DTPSScoreInDB
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.get("/calculate/{donor_id}")
async def calculate_score(donor_id: str):
    db = get_database()
    
    # In a real app, calculate factors from DB history
    # Mocking factors for demonstration
    factors = {
        "attendance": 0.85,
        "recent": 0.9,
        "distance": 0.7
    }
    
    ml_score = get_ml_score(factors["attendance"], factors["recent"], factors["distance"])
    rule_score = 75.0 # Basic rule based logic
    
    final_score = (ml_score * 0.7) + (rule_score * 0.3)
    
    score_doc = {
        "donor_id": donor_id,
        "rule_score": rule_score,
        "ml_score": ml_score,
        "final_score": final_score,
        "factors": factors,
        "calculated_at": datetime.utcnow()
    }
    
    await db.dtps_scores.update_one(
        {"donor_id": donor_id},
        {"$set": score_doc},
        upsert=True
    )
    
    return score_doc

@router.get("/score/{donor_id}")
async def get_score(donor_id: str):
    db = get_database()
    score = await db.dtps_scores.find_one({"donor_id": donor_id})
    if score:
        score["_id"] = str(score["_id"])
    return score
