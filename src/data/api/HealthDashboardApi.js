import axios from "axios";

class HealthDashboardApi {
    static getHealthDashboardData(orgId) {
        return axios.get(`/api/dashboard/${orgId}`);
    }
}

export default HealthDashboardApi;
