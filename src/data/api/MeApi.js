import axios from "axios";
const API_URL = 'http://fint-kunde-portalen-backend:8080';
class MeApi {
  static getMe() {
      return axios.get(`${API_URL}/api/me`);
  }
}

export default MeApi;
