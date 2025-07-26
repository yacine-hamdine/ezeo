// src/api/user.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const getUsersByRole = async (role, token) => {
  const res = await axios.get(`${API_URL}/users/role/${role}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUsersByPosition = async (position, token) => {
  const res = await axios.get(`${API_URL}/users/position/${position}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
