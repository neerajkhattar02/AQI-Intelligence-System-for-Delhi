# Delhi AQI Intelligence System

A machine learning–based data analysis system that provides insights into air pollution patterns in Delhi using historical air quality data.

Instead of predicting next-day AQI, this project focuses on **pollution analysis, seasonality, and severity estimation**, making it more reliable and explainable given real-world data limitations.

---

## What This Project Does

- Analyzes historical air pollution data for Delhi
- Identifies seasonal pollution patterns (winter vs summer)
- Determines which pollutants contribute most to poor air quality
- Uses machine learning to estimate pollution severity
- Converts raw numbers into **Low / Moderate / High / Severe** categories

---

## Data & Challenges

- Government/CPCB-based historical air quality data
- Pollutants used: SO₂, NO₂, SPM, RSPM
- PM2.5 data was sparse, so the system was designed around more reliable pollutants
- Missing values and legacy encoding issues were handled explicitly

---

## Models Used

- **Linear Regression** (baseline)
- **Random Forest Regressor** (final model)

| Model | MAE | RMSE |
|-----|-----|-----|
| Linear Regression | ~61.7 | ~83.5 |
| Random Forest | ~46.4 | ~71.1 |

The Random Forest model significantly improved performance and was saved for reuse.

---

## AQI Intelligence Features

- Seasonal pollution analysis
- Pollutant contribution analysis
- Pollution severity classification for easy interpretation
- Example system-style queries instead of raw predictions

---

## Why This Does Not Predict Tomorrow’s AQI

Accurate AQI forecasting requires real-time weather data, wind patterns, and atmospheric modeling.  
This project intentionally focuses on **analysis and decision support**, not unreliable short-term forecasting.

---

## Project Structure

Delhi-AQI-Intelligence-System/
├── notebooks/
├── data/
├── models/
├── README.md
└── requirements.txt


---

## Future Scope

- Add weather data for AQI forecasting
- Build a real-time dashboard
- Extend to other Indian cities