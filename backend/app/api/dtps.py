from fastapi import APIRouter, Depends
from ..database.mongodb import get_database
from ..ml.dtps_model import get_ml_score, calculate_time_aware_score
from ..models.schemas import DTPSScoreInDB
from datetime import datetime
from bson import ObjectId
from pydantic import BaseModel
from typing import List, Tuple, Optional

class DonorInput(BaseModel):
    id: str
    location: Tuple[float, float]
    history: dict
    is_medically_eligible: bool = True

class HospitalInput(BaseModel):
    id: str
    location: Tuple[float, float]
    status: dict

class RankRequest(BaseModel):
    donors: List[DonorInput]
    hospital: HospitalInput
    blood_type: str = "Whole Blood"

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

@router.post("/time-aware-rank")
async def time_aware_rank(request: RankRequest):
    """
    Prioritize donors based on Expected Blood Arrival Time (EBAT).
    Integrates DTPS + STOE.
    """
    db = get_database()
    results = []
    
    # Process each donor
    for donor in request.donors:
        # Convert Pydantic models to dicts for the engine
        donor_dict = donor.dict()
        hospital_dict = request.hospital.dict()
        
        # Calculate Time-Aware Score
        result = calculate_time_aware_score(donor_dict, hospital_dict, request.blood_type)
        results.append(result)
        
        # Log to Database (Async)
        log_entry = {
            "donor_id": donor.id,
            "hospital_id": request.hospital.id,
            "ebat_minutes": result["ebat_minutes"],
            "breakdown": result["ebat_breakdown"],
            "final_score": result["final_score"],
            "timestamp": datetime.utcnow()
        }
        await db.ebat_logs.insert_one(log_entry)
    
    # Sort by Final Score (Descending)
    sorted_results = sorted(results, key=lambda x: x["final_score"], reverse=True)
    
    return sorted_results
