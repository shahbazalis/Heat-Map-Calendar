import axios from "axios"; // third party library to make api calls
import { url } from "../utils/constant";

export const getData = async () => {
  try {
    //making api call using axios library to get data
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
