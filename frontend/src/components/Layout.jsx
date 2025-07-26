import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="layout">
      <Sidebar user={user} setUser={setUser} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="main">
        <Header onMenuClick={() => setMenuOpen(!menuOpen)} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
