import axios from "axios";

class MeApi {
  static getMe() {
      return axios.get('/api/me');
  }
}

export default MeApi;
