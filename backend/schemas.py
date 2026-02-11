from pydantic import BaseModel, Field

class AQIRequest(BaseModel):
    so2: float = Field(ge=0, le=500)
    no2: float = Field(ge=0, le=500)
    spm: float = Field(ge=0, le=1000)
    month: int = Field(ge=1, le=12)
    age_group: str | None = None
    has_respiratory_issue: bool | None = None
    activity: str | None = None
