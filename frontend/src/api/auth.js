// src/api/auth.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};

export const getUser = async (token) => {
  const res = await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUser = async (data, token) => {
  const res = await axios.patch(`${API_URL}/user`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteUser = async (token) => {
  const res = await axios.delete(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserById = async (id, token) => {
  const res = await axios.get(`${API_URL}/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAllUsers = async (token) => {
  const res = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getUserByUsername = async (username) => {
  const res = await axios.get(`${API_URL}/profile/${username}`);
  return res.data;
};
