import axios from "axios";

class MeApi {
  static getMe() {
      return axios.get('/me');
  }
}

export default MeApi;
