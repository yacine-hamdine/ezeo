import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user }) => {
  const isAuthenticated = !!user;

  // Redirect if not logged in
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Role-based protection for /admin
  const path = window.location.pathname;
  if (path === "/admin" && user.role !== "admin") return <Navigate to="/" />;

  // Proceed to requested page
  return <Outlet />;
};

export default PrivateRoute;