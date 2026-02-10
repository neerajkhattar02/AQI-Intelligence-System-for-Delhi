import { useState } from "react";

function ProfileSetup({ onSave, initialProfile }) {
  const [ageGroup, setAgeGroup] = useState(
    initialProfile?.age_group || "adult"
  );
  const [respiratory, setRespiratory] = useState(
    initialProfile?.has_respiratory_issue || false
  );

  function handleSave() {
    const profile = {
      age_group: ageGroup,
      has_respiratory_issue: respiratory
    };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    onSave(profile);
  }

  return (
    <div style={styles.card}>
      <h3>👤 Your Profile</h3>

      <label>Age Group</label>
      <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
        <option value="kid">Kid</option>
        <option value="adult">Adult</option>
        <option value="elderly">Elderly</option>
      </select>

      <br /><br />

      <label>Respiratory Issue</label>
      <select
        value={respiratory}
        onChange={(e) => setRespiratory(e.target.value === "true")}
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>

      <br /><br />

      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
}

const styles = {
  card: {
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px"
  }
};

export default ProfileSetup;
