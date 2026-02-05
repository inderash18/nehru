
# backend/app/ml/travel_time_estimator.py
import math

class TravelTimeEstimator:
    """
    Estimates travel time between donor and hospital using Haversine distance.
    """
    
    AVERAGE_SPEED_KMH = 40.0
    
    @staticmethod
    def _haversine(lat1, lon1, lat2, lon2):
        """
        Calculate the great circle distance between two points 
        on the earth (specified in decimal degrees)
        """
        # Convert decimal degrees to radians 
        lon1, lat1, lon2, lat2 = map(math.radians, [lon1, lat1, lon2, lat2])

        # Haversine formula 
        dlon = lon2 - lon1 
        dlat = lat2 - lat1 
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.asin(math.sqrt(a)) 
        r = 6371 # Radius of earth in kilometers. Use 3956 for miles.
        return c * r

    @staticmethod
    def estimate_travel_time(donor_loc: tuple, hospital_loc: tuple) -> float:
        """
        Calculate estimated travel time in minutes.
        
        Args:
            donor_loc (tuple): (latitude, longitude)
            hospital_loc (tuple): (latitude, longitude)
            
        Returns:
            float: Estimated travel time in minutes.
        """
        if not donor_loc or not hospital_loc:
            return 0.0
            
        distance_km = TravelTimeEstimator._haversine(
            donor_loc[0], donor_loc[1],
            hospital_loc[0], hospital_loc[1]
        )
        
        # Time = Distance / Speed
        hours = distance_km / TravelTimeEstimator.AVERAGE_SPEED_KMH
        minutes = hours * 60
        
        return round(minutes, 2)
