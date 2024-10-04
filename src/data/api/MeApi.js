import axios from "axios";
class MeApi {
  static getMe() {
      return axios.get(`http://fint-kunde-portal-backend:8080/api/me`);
  }
}

export default MeApi;
