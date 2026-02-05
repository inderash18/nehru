import os
import pickle
import logging
from .survival_time_engine import SurvivalTimeEngine

# Optional ML dependencies
try:
    import numpy as np
    from sklearn.linear_model import LogisticRegression
    SKLEARN_AVAILABLE = True
except ImportError:
    SKLEARN_AVAILABLE = False
    logging.warning("scikit-learn not found. Using heuristic-based scoring.")

MODEL_PATH = "dtps_model.pkl"

def train_mock_model():
    if not SKLEARN_AVAILABLE:
        return
    
    # Mock data: [attendance_rate, recency_score, distance_score]
    X = np.array([
        [0.9, 0.9, 0.8], # Good donor
        [0.5, 0.4, 0.2], # Occasional
        [0.1, 0.1, 0.1], # Low engagement
        [0.8, 0.7, 0.6],
        [0.3, 0.2, 0.5]
    ])
    y = np.array([1, 0, 0, 1, 0]) # 1 = High Priority, 0 = Low
    
    model = LogisticRegression()
    model.fit(X, y)
    
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)

def get_ml_score(attendance: float, recency: float, distance: float) -> float:
    if not SKLEARN_AVAILABLE:
        # Heuristic fallback: Average of factors * 100
        return ((attendance + recency + (1 - distance)) / 3) * 100

    if not os.path.exists(MODEL_PATH):
        try:
            train_mock_model()
        except Exception as e:
            logging.error(f"Failed to train mock model: {e}")
            return ((attendance + recency + (1 - distance)) / 3) * 100
    
    try:
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        
        features = np.array([[attendance, recency, distance]])
        # Get probability of being "High Priority"
        score = model.predict_proba(features)[0][1] * 100
        return score
    except Exception as e:
        logging.error(f"ML Prediction failed: {e}")
        return ((attendance + recency + (1 - distance)) / 3) * 100

def calculate_dtps(factors: dict) -> dict:
    """
    High-level API for DTPS calculation.
    Combines rules + ML.
    """
    attendance = factors.get("attendance_rate", 0.5)
    recency = 1.0 if factors.get("last_donation_months", 12) >= 3 else 0.5
    distance = factors.get("distance_score", 0.5)
    
    ml_score = get_ml_score(attendance, recency, distance)
    
    # Rule engine impact
    rule_score = 0
    if factors.get("attendance_rate", 0) > 0.8: rule_score += 10
    if factors.get("is_emergency", False): rule_score += 20
    
    final_score = min(100, (ml_score * 0.7) + (rule_score * 1.5))
    
    return {
        "final_score": round(final_score, 2),
        "ml_score": round(ml_score, 2),
        "rule_impact": rule_score,
        "factors": {
            "attendance": attendance,
            "recency": recency,
            "distance": distance
        }
    }

def calculate_time_aware_score(donor: dict, hospital: dict, blood_type_needed: str = "Whole Blood") -> dict:
    """
    Optimized ranking based on Survival-Time Optimization Engine (STOE).
    GOAL: Minimize Expected Blood Arrival Time (EBAT).
    """
    
    # 1. Base DTPS Score
    # Map donor dict to factors expected by calculate_dtps
    factors = {
        "attendance_rate": donor.get("history", {}).get("attendance_rate", 0.5),
        "last_donation_months": donor.get("history", {}).get("months_since_last_donation", 12),
        "distance_score": 0.5, # In real app, derived from travel time
        "is_emergency": True
    }
    
    dtps_result = calculate_dtps(factors)
    dtps_score = dtps_result["final_score"]
    
    # 2. Compute EBAT
    stoe_result = SurvivalTimeEngine.compute_ebat(donor, hospital, blood_type_needed)
    ebat_minutes = stoe_result["ebat_minutes"]
    
    # 3. Normalize EBAT (Lower is better, so we invert)
    # Range: 0 to 1
    normalized_ebat = 1 / (1 + ebat_minutes)
    
    # 4. Final Weighted Score
    # Score = (0.6 * Time_Optimality) + (0.4 * Reliability_Score)
    final_score = (0.6 * normalized_ebat * 100) + (0.4 * dtps_score)
    
    # Medical Override (e.g., if donor is not eligible, score is 0)
    if not donor.get("is_medically_eligible", True):
        final_score = 0

    return {
        "donor_id": donor.get("id"),
        "final_score": round(final_score, 2),
        "dtps_component": dtps_score,
        "ebat_minutes": ebat_minutes,
        "ebat_breakdown": stoe_result["breakdown"]
    }
