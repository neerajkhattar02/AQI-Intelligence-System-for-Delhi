import streamlit as st
import pandas as pd
import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "rf_rspm_model.pkl")

model = joblib.load(MODEL_PATH)

st.set_page_config(
    page_title="Delhi AQI Intelligence System",
    layout="centered"
)

# st.divider()

st.title("Delhi AQI Intelligence System")
st.write(
    "Use this tool to estimate **air pollution severity in Delhi** based on typical pollutant levels "
    "and seasonal patterns. Adjust the sliders below and click **Check Air Quality**."
)
st.caption(
    "ℹ️ This tool provides **analysis-based severity estimates** using historical patterns. "
    "It is not a real-time AQI forecast."
)


st.divider()

col1, col2 = st.columns(2)

with col1:
    st.subheader("Enter Pollution Details")

    so2 = st.slider("SO₂ level", 0, 50, 10,
                    help="Sulfur dioxide concentration")

    no2 = st.slider("NO₂ level", 0, 100, 40,
                    help="Nitrogen dioxide from traffic")

    spm = st.slider("SPM level", 0, 500, 180,
                    help="Suspended particulate matter")

    month = st.selectbox(
        "Month",
        options=[
            ("January", 1), ("February", 2), ("March", 3),
            ("April", 4), ("May", 5), ("June", 6),
            ("July", 7), ("August", 8), ("September", 9),
            ("October", 10), ("November", 11), ("December", 12)
        ],
        format_func=lambda x: x[0]
    )
    month_num = month[1]

# ------------------ Severity Logic ------------------
def pollution_severity(rspm):
    if rspm < 100:
        return "Low"
    elif rspm < 200:
        return "Moderate"
    elif rspm < 300:
        return "High"
    else:
        return "Severe"


def severity_color(severity):
    return {
        "Low": "🟢 Low",
        "Moderate": "🟡 Moderate",
        "High": "🟠 High",
        "Severe": "🔴 Severe"
    }[severity]


# ------------------ Prediction ------------------
if st.button("Check Air Quality"):
    input_df = pd.DataFrame([{
        "so2": so2,
        "no2": no2,
        "spm": spm,
        "year": 2024,
        "month": month_num
    }])

    predicted_rspm = model.predict(input_df)[0]
    severity = pollution_severity(predicted_rspm)

    with col2:
        st.subheader("Air Quality Result")

        st.metric("Estimated RSPM", f"{predicted_rspm:.1f}")
        st.metric("Pollution Severity", severity_color(severity))

        if severity == "Severe":
            st.error("Severe pollution detected. Avoid outdoor activity and wear protection.")
        elif severity == "High":
            st.warning("High pollution levels. Reduce prolonged outdoor exposure.")
        elif severity == "Moderate":
            st.info("Moderate pollution. Sensitive groups should take precautions.")
        else:
            st.success("Low pollution levels. Air quality is relatively acceptable.")

        st.divider()
        with st.expander("About this system"):
            st.write(
                "This application analyzes historical air quality data for Delhi and uses a "
                "machine learning model to estimate pollution severity based on pollutant levels "
                "and seasonality. It is intended for analysis and decision support."
            )


if st.button("Reset Inputs"):
    st.experimental_rerun()

st.divider()
st.caption("Built for air quality analysis and decision support using machine learning.")
