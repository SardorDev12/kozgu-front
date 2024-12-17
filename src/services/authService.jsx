import axios from "axios";

const API = "http://127.0.0.1:8000/api/";

const register = (username, email, password) => {
  return axios.post(API + "register/", { username, email, password });
};

const login = async (username, password) => {
  try {
    const response = await axios.post(API + "token/", { username, password });
    const { access, refresh } = response.data;

    if (access) {
      const userInfoResponse = await axios.get(API + "user/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      const userData = {
        access,
        refresh,
        username: userInfoResponse.data.username,
        email: userInfoResponse.data.email,
        first_name: userInfoResponse.data.first_name,
        last_name: userInfoResponse.data.last_name,
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
    const user = JSON.parse(localStorage.getItem("user")); // Get stored user data
    if (!user || !user.access) throw new Error("Access token not found");

    const response = await fetch(`${API}user/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access}`, // Correct access token usage
      },
    });

    if (!response.ok) throw new Error("Failed to fetch user info");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user info:", error.message);
  }
};

export default { register, login, logout, getCurrentUser };
