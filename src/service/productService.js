import axios from 'axios';
// import authHeader from './JwtService';
const EMPLOYEE_API_BASE_URL = "http://192.168.1.39:3001/product";

class roleService {

    async getall() {
        return await axios.get(EMPLOYEE_API_BASE_URL + '/all');
    }
    add(product) {
        return axios.post(EMPLOYEE_API_BASE_URL + '/add', product);
    }
    edit(id, product) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + id, product);
    }

    delete(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + 'delete/' + id);
    }

}

export default new roleService();