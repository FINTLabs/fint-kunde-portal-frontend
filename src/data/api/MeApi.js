import axios from "axios";

const API_URL = process.env.BASE_URL
const apiClient = axios.create({
    baseURL: API_URL
})

class MeApi {
    static getMe() {
        console.log("INSIDE ME CALL:", API_URL);
        return apiClient.get(`/api/me`);
    }
}

export default MeApi;
