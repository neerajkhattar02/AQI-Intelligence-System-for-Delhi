import { useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/assess";

const severityMeta = {
  Low: { icon: "🟢", label: "Low Pollution" },
  Moderate: { icon: "🟡", label: "Moderate Pollution" },
  High: { icon: "🟠", label: "High Pollution" },
  Severe: { icon: "🔴", label: "Severe Pollution" },
};

const months = [
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
];

export default function App() {
  const [showProfile, setShowProfile] = useState(false);

  const [profile, setProfile] = useState({
    age_group: "adult",
    has_respiratory_issue: false,
  });

  const [inputs, setInputs] = useState({
    so2: 20,
    no2: 50,
    spm: 150,
    month: 4,
    activity: "walk",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const severityStyles = {
    Low: "severity low",
    Moderate: "severity moderate",
    High: "severity high",
    Severe: "severity severe",
  };

  const checkAirQuality = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...inputs, ...profile }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Backend error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Air Quality Assistant for Delhi</h1>
        <button className="profile-btn" onClick={() => setShowProfile(true)}>
          👤 My Profile
        </button>
      </header>

      <div className="card fade-in input-card">
        <button
          onClick={() => setShowInfo(!showInfo)}
          style={{
            background: "none",
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ℹ️ How this system works
        </button>

        {showInfo && (
          <div style={{ marginTop: "12px", lineHeight: 1.6 }}>
            <p>
              • A <strong>machine learning model</strong> analyzes historical Delhi
              pollution data.
            </p>
            <p>
              • <strong>Live weather data</strong> (temperature, humidity, wind) adjusts
              real-world risk.
            </p>
            <p>
              • Your <strong>age, health profile</strong>, and{" "}
              <strong>planned activity</strong> personalize the advice.
            </p>
            <p style={{ fontSize: "13px", color: "#555" }}>
              ⚠️ This is an air-quality decision support tool, not medical advice.
            </p>
          </div>
        )}
      </div>


      {showProfile && (
        <>
          {/* Overlay */}
          <div
            className="profile-overlay"
            onClick={() => setShowProfile(false)}
          />

          {/* Profile Drawer */}
          <div className="profile-drawer slide-in">
            <div className="profile-header">
              <h2>Your Profile</h2>
            </div>

            <label>Age Group</label>
            <select
              value={profile.age_group}
              onChange={(e) =>
                setProfile({ ...profile, age_group: e.target.value })
              }
            >
              <option value="child">Child</option>
              <option value="adult">Adult</option>
              <option value="elderly">Elderly</option>
            </select>

            <label>Respiratory Issues</label>
            <select
              value={profile.has_respiratory_issue}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  has_respiratory_issue: e.target.value === "true",
                })
              }
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>

            <button onClick={() => setShowProfile(false)}>
              Save & Close
            </button>
          </div>
        </>
      )}

      {/* Input Card */}
      <div className="card fade-in">
        <h2>Check Air Quality</h2>

        <div className="slider-group">
          <label>SO₂: {inputs.so2}</label>
          <input
            type="range"
            min="0"
            max="50"
            value={inputs.so2}
            onChange={(e) =>
              setInputs({ ...inputs, so2: Number(e.target.value) })
            }
          />
        </div>

        <div className="slider-group">
          <label>NO₂: {inputs.no2}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={inputs.no2}
            onChange={(e) =>
              setInputs({ ...inputs, no2: Number(e.target.value) })
            }
          />
        </div>

        <div className="slider-group">
          <label>SPM: {inputs.spm}</label>
          <input
            type="range"
            min="0"
            max="500"
            value={inputs.spm}
            onChange={(e) =>
              setInputs({ ...inputs, spm: Number(e.target.value) })
            }
          />
        </div>

        <div className="row">
          <select
            value={inputs.month}
            onChange={(e) =>
              setInputs({ ...inputs, month: Number(e.target.value) })
            }
          >
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.name}
              </option>
            ))}
          </select>

          <select
            value={inputs.activity}
            onChange={(e) =>
              setInputs({ ...inputs, activity: e.target.value })
            }
          >
            <option value="walk">Walk</option>
            <option value="exercise">Exercise</option>
            <option value="indoor">Indoor</option>
          </select>
        </div>

        <button className="primary" onClick={checkAirQuality}>
          {loading ? "Checking..." : "Check Air Quality"}
        </button>
      </div>

      {/* Result */}
      {/* Result */}
      {result && (
        <>
          <div className={`result-card ${severityStyles[result.severity]} fade-in`}>
            <h2>
              {severityMeta[result.severity].icon}{" "}
              {severityMeta[result.severity].label}
            </h2>
            <p><strong>Final Risk:</strong> {result.final_risk}</p>
            <p className="advice">{result.advice}</p>
          </div>

          {/* Weather Card */}
          <div className="card weather-card fade-in">
            <h2>Live Weather in Delhi</h2>

            <div className="weather-grid">
              <div className="weather-item">
                <span className="label">🌡️ Temperature</span>
                <span className="value">{result.weather.temperature}°C</span>
              </div>

              <div className="weather-item">
                <span className="label">💧 Humidity</span>
                <span className="value">{result.weather.humidity}%</span>
              </div>

              <div className="weather-item">
                <span className="label">🌬️ Wind Speed</span>
                <span className="value">{result.weather.wind_speed} m/s</span>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
