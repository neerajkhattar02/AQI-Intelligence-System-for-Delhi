def pollution_severity(rspm):
    if rspm < 100:
        return "Low"
    elif rspm < 200:
        return "Moderate"
    elif rspm < 300:
        return "High"
    else:
        return "Severe"


def final_advice(final_risk, age_group, has_respiratory_issue, activity):
    # Always safe
    if activity == "indoor":
        return "Indoor activity planned. Air quality risk is minimal for you."

    # High risk scenarios
    if final_risk == "High":
        if has_respiratory_issue or age_group == "elderly" or age_group == "kid":
            return "Air quality is poor today. It is best for you to stay indoors."
        if activity == "exercise":
            return "High pollution risk today. Avoid outdoor exercise."
        return "Not a good day to be outside. Keep outings short if necessary."

    # Moderate risk scenarios
    if final_risk == "Moderate":
        if activity == "exercise":
            return "Moderate pollution today. Light activity only, avoid heavy exercise."
        return "Okay for short outdoor activities. Avoid long exposure."

    # Low risk
    if has_respiratory_issue or age_group == "elderly" or age_group == "kid":
        return "Air quality is generally good today, but due to your health profile, prefer light or indoor activities."
    return "Good day for outdoor activities. Have fun!"



def weather_risk_adjustment(severity, weather):
    # Always initialize
    risk_score = 0

    # Base risk from pollution
    if severity == "Low":
        risk_score += 0
    elif severity == "Moderate":
        risk_score += 1
    elif severity == "High":
        risk_score += 2
    elif severity == "Severe":
        risk_score += 3

    # Wind effect
    wind_speed = weather.get("wind_speed", 3)
    if wind_speed < 2:
        risk_score += 1
    elif wind_speed > 5:
        risk_score -= 1

    # Humidity effect
    humidity = weather.get("humidity", 50)
    if humidity > 70:
        risk_score += 1

    # Temperature inversion (winter)
    temperature = weather.get("temperature", 25)
    if temperature < 15:
        risk_score += 1

    # Safety clamp
    risk_score = max(risk_score, 0)

    if risk_score <= 1:
        return "Low"
    elif risk_score == 2:
        return "Moderate"
    else:
        return "High"
