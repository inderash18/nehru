from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict
from datetime import datetime
from .enums import UserRole, BloodType, AppointmentStatus, InventoryStatus, AlertSeverity

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: str
    blood_type: BloodType
    date_of_birth: str
    address: Dict[str, str]

class UserCreate(UserBase):
    password: str
    role: UserRole = UserRole.DONOR

class UserInDB(UserBase):
    id: str = Field(alias="_id")
    role: UserRole
    is_verified: bool = True
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class BloodInventoryBase(BaseModel):
    blood_type: BloodType
    units: int
    threshold: int
    location: str

class BloodInventoryInDB(BloodInventoryBase):
    id: str = Field(alias="_id")
    last_updated: datetime
    status: InventoryStatus

class DonationBase(BaseModel):
    donor_id: str
    blood_type: BloodType
    units: int
    location: str

class DonationInDB(DonationBase):
    id: str = Field(alias="_id")
    donation_date: datetime
    status: str = "completed"

class AppointmentBase(BaseModel):
    donor_id: str
    date: datetime
    time: str

class AppointmentInDB(AppointmentBase):
    id: str = Field(alias="_id")
    status: AppointmentStatus
    dtps_score: int

class DTPSFactors(BaseModel):
    attendance: float
    recent: float
    distance: float

class DTPSScoreInDB(BaseModel):
    id: str = Field(alias="_id")
    donor_id: str
    rule_score: float
    ml_score: float
    final_score: float
    factors: DTPSFactors
    calculated_at: datetime

class AlertBase(BaseModel):
    type: str
    blood_type: Optional[BloodType] = None
    message: str
    severity: AlertSeverity

class AlertInDB(AlertBase):
    id: str = Field(alias="_id")
    is_active: bool
    created_at: datetime
