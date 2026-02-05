
# backend/app/ml/hospital_readiness_model.py

class HospitalReadinessModel:
    """
    Estimates the delay at the hospital based on current load.
    """
    
    BASE_PROCESSING_TIME = 15.0 # minutes
    TIME_PER_CASE = 5.0 # minutes per active case
    
    @staticmethod
    def estimate_delay(hospital_status: dict) -> float:
        """
        Calculate total hospital delay.
        
        Args:
            hospital_status (dict): Contains keys like:
                - active_cases (int): Number of current emergency cases
                
        Returns:
            float: Total delay in minutes
        """
        active_cases = hospital_status.get("active_cases", 0)
        
        total_delay = (
            HospitalReadinessModel.BASE_PROCESSING_TIME + 
            (active_cases * HospitalReadinessModel.TIME_PER_CASE)
        )
        
        return float(total_delay)

    @staticmethod
    def get_preparation_time(blood_type: str) -> float:
        """
        Get preparation time based on blood type/product.
        """
        # Standard preparation times in minutes
        prep_times = {
            "Whole Blood": 10.0,
            "PRBC": 20.0, # Packed Red Blood Cells
            "Platelets": 45.0,
            "Plasma": 40.0,
            "Cryoprecipitate": 30.0
        }
        
        # Default to Whole Blood if unknown or generic type like 'A+'
        return prep_times.get(blood_type, 10.0)
