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

export const postReq = async (endpoint, data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.access) {
    console.error("Access token not found");
    return null;
  }

  try {
    const response = await axios.post(
      `${API}${endpoint}`, // Endpoint URL
      data, // Data (must be second argument)
      {
        headers: {
          // Headers (must be part of the third argument)
          Authorization: `Bearer ${user.access}`,
          "Content-Type": "application/json", // Optional but recommended
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Post request failed:",
      error.response?.data || error.message
    );
    throw error; // Re-throw the error for caller to handle
  }
};
