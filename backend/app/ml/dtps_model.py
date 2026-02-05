import os
import pickle
import logging

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
