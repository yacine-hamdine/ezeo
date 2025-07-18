import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../pages/Events";
import Analytics from "../pages/Analytics";
import Personal from "../pages/Personal";
import Admin from "../pages/Admin";
import Login from "../pages/Login";

const AppRoutes = ({ user }) => {
  const isAuthenticated = !!user;

  const PrivateRoute = ({ children, roles }) => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
      <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
      <Route path="/personal" element={<PrivateRoute><Personal /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute roles={['admin']}><Admin /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
