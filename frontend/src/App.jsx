import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Analytics from "./pages/Analytics";
import Personal from "./pages/Personal";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signin from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("ezeo-token") || sessionStorage.getItem("ezeo-token");
    const storedUser = localStorage.getItem("ezeo-user") || sessionStorage.getItem("ezeo-user");

    if (loggedUser && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/signin" element={user ? <Navigate to="/" /> : <Signin />} />

        {/* Protected routes wrapper */}
        <Route element={<PrivateRoute user={user} setUser={setUser} />}>
          <Route element={<Layout user={user} setUser={setUser} />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/personal" element={<Personal />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
