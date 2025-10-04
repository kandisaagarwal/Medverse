from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class UserInfo(BaseModel):
    age: int
    gender: str
    location: str

class Report(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_info: UserInfo
    symptoms: str
    severity: Optional[int] = None
    diagnosis: Optional[str] = None
    status: str = "pending_review"
    assigned_to: Optional[str] = None
    follow_ups: List[str] = []
    email: EmailStr

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}