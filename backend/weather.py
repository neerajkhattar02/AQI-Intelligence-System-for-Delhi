import requests

API_KEY = "6cbd9d4d98fcd428e8d02b64940a372a"
CITY = "Delhi"
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

def get_weather():
    params = {
        "q": CITY,
        "appid": API_KEY,
        "units": "metric"
    }

    response = requests.get(BASE_URL, params=params, timeout=5)
    data = response.json()

    return {
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"]
    }
