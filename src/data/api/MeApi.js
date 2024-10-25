import axios from "axios";

const API_URL = process.env.BASE_URL
const apiClient = axios.create({
    baseURL: API_URL
})
const baseURL = process.env.REACT_APP_API_BASE_URL;

class MeApi {
    static getMe() {
        console.log("INSIDE ME CALL: ", baseURL);
        return axios.get(`/api/me`);
    }
}

export default MeApi;
