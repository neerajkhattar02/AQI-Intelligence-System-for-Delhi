from pydantic import BaseModel
from typing import Dict

class AQIResponse(BaseModel):
    severity: str
    estimated_rspm: float
    final_risk: str
    weather: Dict[str, float]
    advice: str
