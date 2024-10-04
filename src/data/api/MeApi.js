import axios from "axios";
const API_URL = 'https://kunde.felleskomponent.no';
class MeApi {
  static getMe() {
      return axios.get(`${API_URL}/api/me`);
  }
}

export default MeApi;
