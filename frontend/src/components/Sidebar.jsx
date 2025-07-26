import { Link } from "react-router-dom";
import ProfileBanner from "./ProfileBanner";

const Sidebar = ({ user, setUser, open, onClose }) => {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-inner">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="logo">LOGO</div>

        <ProfileBanner user={user} setUser={setUser} />

        <nav className="menu">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/personal">Personal</Link>
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        </nav>

        <div className="footer">© 2025 — Infos, etc.</div>
      </div>
    </aside>
  );
};

export default Sidebar;
