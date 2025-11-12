import axios from "axios";

const API_URL = "http://10.0.2.2:3000/api"; // Android emulator

export const getStories = async () => {
  const res = await axios.get(`${API_URL}/stories`);
  return res.data;
};

export const getStoryById = async (id) => {
  const res = await axios.get(`${API_URL}/stories/${id}`);
  return res.data;
};
