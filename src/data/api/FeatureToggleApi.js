const axios = require("axios");

class FeatureToggleApi {
    static getFeatures = () => {
        return axios.get('/api/api/feature');
    }
}

export default FeatureToggleApi;
