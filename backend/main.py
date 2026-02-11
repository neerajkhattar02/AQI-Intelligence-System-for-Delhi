from fastapi import FastAPI
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from backend.weather import get_weather
from backend.logic import weather_risk_adjustment
from backend.schemas import AQIRequest
from backend.model_loader import model
from backend.logic import pollution_severity, final_advice
from fastapi import HTTPException
from backend.responses import AQIResponse
import pandas as pd

app = FastAPI(title="AQI Decision Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # IMPORTANT
    allow_credentials=False,      # IMPORTANT
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "AQI backend is running"}

@app.post("/assess", response_model=AQIResponse)
def assess_aqi(data: AQIRequest):
    try:
        input_df = pd.DataFrame([{
            "so2": data.so2,
            "no2": data.no2,
            "spm": data.spm,
            "year": 2024,
            "month": data.month
        }])

        predicted_rspm = model.predict(input_df)[0]
        severity = pollution_severity(predicted_rspm)

        weather = get_weather()
        final_risk = weather_risk_adjustment(severity, weather)

        advice = final_advice(
            final_risk,
            data.age_group,
            data.has_respiratory_issue,
            data.activity
        )

        return AQIResponse(
            severity=severity,
            estimated_rspm=round(predicted_rspm, 1),
            final_risk=final_risk,
            weather=weather,
            advice=advice
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Assessment failed: {str(e)}"
        )
