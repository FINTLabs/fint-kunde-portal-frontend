import axios from "axios";

class RoleApi {
    static getRoles() {
        return axios.get('/api/role');
    }

    static addRole(organisationName, nin, roles) {
        return axios.put(`/api/organisations/${organisationName}/contacts/roles/${nin}/${roles}`);
    }

    static removeRole(organisationName, nin, roles) {
        return axios.delete(`/api/organisations/${organisationName}/contacts/roles/${nin}/${roles}`);
    }
}

export default RoleApi;
