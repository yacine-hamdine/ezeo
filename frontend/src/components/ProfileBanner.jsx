
const ProfileBanner = ({ user, setUser }) => {
  return (
    <div className="profile-banner">
      <div className="name">{user?.name || "User"}</div>
      <div className="email">{user?.email || "user@email.com"}</div>
      <button className="logout" onClick={() => {
        localStorage.removeItem("ezeo-token");
        localStorage.removeItem("ezeo-user");
        setUser(null); // Clear user state in parent
        window.location.reload(); // Reload to redirect to login
      }}>Logout</button>
    </div>
  );
};

export default ProfileBanner;
