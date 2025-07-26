// src/api/event.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

export const createEvent = async (data, token) => {
  const res = await axios.post(`${API_URL}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getEvent = async (id, token) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateTaskOrAction = async (id, data, token) => {
  const res = await axios.patch(`${API_URL}/${id}/task`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
