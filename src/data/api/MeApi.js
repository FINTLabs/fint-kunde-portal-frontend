import axios from "axios";
class MeApi {
  static getMe() {
      const API_URL = process.env.BASE_PATH;
      console.log("INSIDE ME CALL:", API_URL);
      return axios.get(`/api/me`);
  }
}

export default MeApi;
