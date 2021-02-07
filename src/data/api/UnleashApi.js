import axios from "axios";

export default class UnleashApi {

    static getFeatures() {
        return axios.get('/api/feature')
            .then(response => response);
    }
}
