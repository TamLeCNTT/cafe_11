import axios from 'axios';
// import authHeader from './JwtService';
const EMPLOYEE_API_BASE_URL = "http://localhost:3001/role";

class roleService {

    add(role) {
        return axios.post(EMPLOYEE_API_BASE_URL + '/add', role);
    }
    edit(role) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/edit', role);
    }

    delete(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + 'delete/' + id);
    }

}

export default new roleService();