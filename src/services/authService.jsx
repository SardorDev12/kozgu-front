import axios from "axios";

const API = "http://127.0.0.1:8000/api/";

const register = (username, email, password) => {
  return axios.post(API + "register/", { username, email, password });
};

const login = async (username, password) => {
  try {
    const response = await axios.post(API + "login/", { username, password });
    const { access, refresh } = response.data;

    if (access) {
      const userInfoResponse = await axios.get(API + "user/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      const userData = {
        access,
        refresh,
        username: userInfoResponse.data.username,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authTokens");
};

const getCurrentUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.access) {
      console.error("Access token not found");
      return null;
    }

    if (!API) {
      throw new Error("API endpoint is not defined");
    }

    const response = await axios.get(`${API}user/`, {
      headers: {
        Authorization: `Bearer ${user.access}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Error fetching user info: ${error.response.status} - ${error.response.data}`
      );
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error fetching user info:", error.message);
    }
    return null;
  }
};

export default { register, login, logout, getCurrentUser };
