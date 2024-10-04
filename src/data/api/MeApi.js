import axios from "axios";
const API_URL = process.env.API_URL;

class MeApi {
  static getMe() {
      return axios.get(`${API_URL}/me`);
  }
}

export default MeApi;
