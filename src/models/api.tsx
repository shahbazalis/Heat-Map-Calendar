import axios from "axios"; // third party library to make api calls
import { url } from "../constants/constant";

export const getUserActivityData = async () => {
  try {
    //making api call using axios library to get data
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
      throw error;
  }
};
