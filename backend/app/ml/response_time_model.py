
# backend/app/ml/response_time_model.py

class ResponseTimeModel:
    """
    Estimates the time it takes for a donor to respond to an alert
    and start their journey.
    """
    
    DEFAULT_RESPONSE_TIME_MINUTES = 8.0
    
    @staticmethod
    def estimate_response_time(donor_history: dict) -> float:
        """
        Estimate response time based on past donor behavior.
        
        Args:
            donor_history (dict): Dictionary containing keys like:
                - average_response_time (float): Historical average in minutes
                - total_donations (int): Number of past donations
                
        Returns:
            float: Estimated response time in minutes.
        """
        if not donor_history:
            return ResponseTimeModel.DEFAULT_RESPONSE_TIME_MINUTES
            
        avg_time = donor_history.get("average_response_time")
        
        # If we have valid historical data, use it
        if avg_time is not None and avg_time > 0:
            return float(avg_time)
            
        return ResponseTimeModel.DEFAULT_RESPONSE_TIME_MINUTES
