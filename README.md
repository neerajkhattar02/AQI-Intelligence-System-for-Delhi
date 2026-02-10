# AQI Intelligence System for Delhi

A full-stack air quality intelligence system that analyzes pollution data, live weather conditions, and personal context to provide **personalized air quality risk assessment and actionable advice**.

This project goes beyond basic AQI prediction by focusing on **decision support for real users**.

---

## Features

- Machine learning–based pollution severity estimation
- Live weather integration (temperature, humidity, wind)
- Personalized risk adjustment based on age, health, and activity
- Human-friendly advice (not just numeric AQI)
- Modern responsive UI built with React
- FastAPI backend serving ML predictions and logic

---

## How It Works

1. A trained ML model estimates pollution severity using pollutant levels and seasonality
2. Real-time weather data adjusts the final risk
3. User profile (age, respiratory health) and planned activity personalize the advice
4. The system outputs **clear, actionable guidance** for daily decisions

> This is an air-quality decision support system, not a medical or official AQI forecasting tool.

---

## Tech Stack

**Frontend**
- React (Vite)
- CSS (custom UI, no heavy libraries)

**Backend**
- FastAPI
- Python
- Scikit-learn
- Joblib

**Data & APIs**
- Historical air pollution data
- Live weather API

---

## Project Structure

delhi-aqi-intelligence-system/
├── backend/
│ ├── main.py
│ ├── logic.py
│ ├── models/
│ └── requirements.txt
├── frontend-react/
│ ├── src/
│ └── public/
└── README.md


---

## Running Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
Frontend
cd frontend-react
npm install
npm run dev
Deployment
Frontend deployed on Vercel

Backend deployed on Render

(Links will be added once deployment is complete.)

Motivation
Air quality affects daily decisions, yet AQI numbers alone are often confusing.
This project aims to translate pollution data into meaningful, personalized guidance for everyday use.

Disclaimer
This project is for educational and analytical purposes only.
It does not replace official air quality reports or medical advice.


---

# ABOUT SECTION (RIGHT SIDE OF GITHUB)

On GitHub repo sidebar:

### Website (after deployment):
https://your-vercel-link.vercel.app


### License:
Choose **MIT License**

Why:
- Standard
- Recruiter-friendly
- No legal headache

---

# COMMIT MESSAGE FOR FIRST PUSH

When pushing initial version:

```bash
git commit -m "Initial full-stack AQI intelligence system"
