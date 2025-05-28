from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class ChatRequest(BaseModel):
    message: str
    mode: str
    sessionId: str
    image: Optional[str] = None

class ChatResponse(BaseModel):
    message: str
    data: Optional[Dict[str, Any]] = None
    suggestions: Optional[List[str]] = None

class VisionRequest(BaseModel):
    image: str

class VisionAnalysis(BaseModel):
    equipment_type: Optional[str] = None
    issues_detected: Optional[List[str]] = None
    confidence: float
    suggestions: Optional[List[str]] = None

class Message(BaseModel):
    id: str
    role: str
    content: str
    timestamp: datetime
    data: Optional[Dict[str, Any]] = None
    image: Optional[str] = None