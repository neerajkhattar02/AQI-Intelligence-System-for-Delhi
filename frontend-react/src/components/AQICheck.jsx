import { useState } from "react";
import { assessAQI } from "../services/api";

function AQICheck({ profile }) {
    const [so2, setSo2] = useState(20);
    const [no2, setNo2] = useState(50);
    const [spm, setSpm] = useState(150);
    const [month, setMonth] = useState(12);
    const [activity, setActivity] = useState("walk");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const isValid =
        so2 >= 0 && so2 <= 100 &&
        no2 >= 0 && no2 <= 200 &&
        spm >= 0 && spm <= 500;

    async function handleCheck() {
        setLoading(true);

        const payload = {
            so2,
            no2,
            spm,
            month,
            activity,
            age_group: profile.age_group,
            has_respiratory_issue: profile.has_respiratory_issue
        };

        try {
            const res = await assessAQI(payload);
            setResult(res);
        } catch (error) {
            console.error("Backend error:", error);
            alert("Backend error. Make sure backend is running.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div style={styles.card}>
            <h3>🌤️ Check Air Quality</h3>

            <label>SO₂: {so2}</label>
            <input type="range" min="0" max="100" value={so2}
                onChange={(e) => setSo2(Number(e.target.value))} />

            <label>NO₂: {no2}</label>
            <input type="range" min="0" max="200" value={no2}
                onChange={(e) => setNo2(Number(e.target.value))} />

            <label>SPM: {spm}</label>
            <input type="range" min="0" max="500" value={spm}
                onChange={(e) => setSpm(Number(e.target.value))} />

            <label>Month</label>
            <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
            >
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
            </select>


            <label>Activity</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                <option value="walk">Walk</option>
                <option value="exercise">Exercise</option>
                <option value="indoor">Indoor</option>
            </select>

            <br /><br />

            <button onClick={handleCheck} disabled={!isValid || loading}>
                {loading ? "Checking..." : "Check Air Quality"}
            </button>

            {result && (
                <div style={styles.result}>
                    <p><strong>Severity:</strong> {result.severity}</p>
                    <p><strong>Final Risk:</strong> {result.final_risk}</p>
                    <p><strong>Advice:</strong> {result.advice}</p>
                </div>
            )}
        </div>
    );
}

const styles = {
    card: {
        padding: "16px",
        border: "1px solid #1b0707",
        borderRadius: "8px"
    },
    result: {
        marginTop: "16px",
        padding: "12px",
        background: "#1a0606",
        borderRadius: "6px"
    }
};

export default AQICheck;
