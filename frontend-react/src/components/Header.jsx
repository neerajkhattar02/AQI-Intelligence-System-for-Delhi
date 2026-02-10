function Header({ onEditProfile }) {
  return (
    <div style={styles.header}>
      <h2>Air Quality Assistant</h2>
      <button style={styles.profileBtn} onClick={onEditProfile}>
        👤 My Profile
      </button>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  profileBtn: {
    background: "#eee",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "6px"
  }
};

export default Header;
