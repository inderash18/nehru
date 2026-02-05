
# backend/app/ml/survival_time_engine.py

from .response_time_model import ResponseTimeModel
from .travel_time_estimator import TravelTimeEstimator
from .hospital_readiness_model import HospitalReadinessModel

class SurvivalTimeEngine:
    """
    STOE Core: Orchestrates the calculation of Expected Blood Arrival Time (EBAT).
    """
    
    @staticmethod
    def compute_ebat(donor: dict, hospital: dict, blood_type_needed: str = "Whole Blood") -> dict:
        """
        Computes the Estimated Blood Arrival Time (EBAT) and its breakdown.
        
        Args:
            donor (dict): Donor info including location and history.
            hospital (dict): Hospital info including location and status.
            blood_type_needed (str): The type of blood product required.
            
        Returns:
            dict: {
                "ebat_minutes": float,
                "breakdown": {
                    "response": float,
                    "travel": float,
                    "hospital": float,
                    "preparation": float
                }
            }
        """
        
        # 1. Calculate Response Time
        t_response = ResponseTimeModel.estimate_response_time(donor.get("history", {}))
        
        # 2. Calculate Travel Time
        donor_loc = donor.get("location", (0, 0)) # Expecting tuple (lat, lon)
        hospital_loc = hospital.get("location", (0, 0))
        t_travel = TravelTimeEstimator.estimate_travel_time(donor_loc, hospital_loc)
        
        # 3. Calculate Hospital Delay
        t_hospital = HospitalReadinessModel.estimate_delay(hospital.get("status", {}))
        
        # 4. Calculate Preparation Time
        t_preparation = HospitalReadinessModel.get_preparation_time(blood_type_needed)
        
        # Total EBAT
        ebat = t_response + t_travel + t_hospital + t_preparation
        
        return {
            "ebat_minutes": round(ebat, 2),
            "breakdown": {
                "response": round(t_response, 2),
                "travel": round(t_travel, 2),
                "hospital": round(t_hospital, 2),
                "preparation": round(t_preparation, 2)
            }
        }
