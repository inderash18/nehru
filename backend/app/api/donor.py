from fastapi import APIRouter, Depends, HTTPException
from ..database.mongodb import get_database
from .auth import get_current_user
from ..models.schemas import AppointmentBase, AppointmentInDB
from ..models.enums import AppointmentStatus
from ..ml.dtps_model import calculate_dtps
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.post("/appointments")
async def schedule_appointment(apt: AppointmentBase, current_user: dict = Depends(get_current_user)):
    db = get_database()
    
    # Calculate DTPS score for this appointment
    score_data = calculate_dtps({
        "attendance_rate": 0.8, # Mocked for now
        "last_donation_months": 3,
        "is_emergency": False
    })
    
    apt_dict = apt.dict()
    apt_dict["donor_id"] = current_user["id"]
    apt_dict["status"] = AppointmentStatus.PENDING
    apt_dict["dtps_score"] = score_data["final_score"]
    apt_dict["created_at"] = datetime.utcnow()
    
    result = await db.appointments.insert_one(apt_dict)
    apt_dict["_id"] = str(result.inserted_id)
    return apt_dict

@router.get("/appointments")
async def get_my_appointments(current_user: dict = Depends(get_current_user)):
    db = get_database()
    cursor = db.appointments.find({"donor_id": current_user["id"]})
    apts = await cursor.to_list(length=100)
    for a in apts:
        a["_id"] = str(a["_id"])
    return apts

@router.get("/profile")
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    return current_user
@router.get("/stats")
async def get_donor_stats(current_user: dict = Depends(get_current_user)):
    db = get_database()
    total_donations = await db.donations.count_documents({"donor_id": current_user["id"]})
    
    score_data = calculate_dtps({
        "attendance_rate": 0.8,
        "last_donation_months": 3,
        "is_emergency": False
    })
    
    return {
        "total_donations": total_donations,
        "lives_saved": total_donations * 3,
        "dtps_score": score_data["final_score"],
        "next_eligibility": "2026-03-15" # Mocked for now
    }
