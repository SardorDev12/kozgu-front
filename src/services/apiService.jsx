import axios from "axios";
import authService from "../services/authService";

const API = "http://127.0.0.1:8000/api/";

export const getReq = async (endpoint) => {
  try {
    const res = await axios.get(`${API}${endpoint}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const postReq = async (endpoint, data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.access) {
    console.error("Access token not found");
    return null;
  }

  try {
    const response = await axios.post(`${API}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${user.access}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Post request failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const res = await getReq("profiles/");
    const currentUser = await authService.getCurrentUser();
    const profileData = res.find((item) => item.user === currentUser.id);

    return profileData;
  } catch (error) {
    console.log(error);
  }
};
