import axios from "axios";

const API = "http://127.0.0.1:8000/api/";

export const getReq = async (endpoint) => {
  try {
    const res = await axios.get(`${API}${endpoint}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
