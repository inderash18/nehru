from enum import Enum

class UserRole(str, Enum):
    DONOR = "donor"
    ADMIN = "admin"
    STAFF = "staff"

class BloodType(str, Enum):
    A_POS = "A+"
    A_NEG = "A-"
    B_POS = "B+"
    B_NEG = "B-"
    AB_POS = "AB+"
    AB_NEG = "AB-"
    O_POS = "O+"
    O_NEG = "O-"

class AppointmentStatus(str, Enum):
    SCHEDULED = "scheduled"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class InventoryStatus(str, Enum):
    ADEQUATE = "adequate"
    LOW = "low"
    CRITICAL = "critical"

class AlertSeverity(str, Enum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"
