import axios from "axios";
import { API } from "./variables";

export const postComment = async (userID, postID, comment) => {
  try {
    const res = await axios.post(`${API}comments/create/`);
  } catch (error) {}
};
