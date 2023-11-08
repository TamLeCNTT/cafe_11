import axios from 'axios';
// import authHeader from './JwtService';
const EMPLOYEE_API_BASE_URL = "http://192.168.1.39:3001/getproduct";

class nhaphangService {

    async getall() {
        return await axios.get(EMPLOYEE_API_BASE_URL + '/all');
    }
    add(product) {
        return axios.post(EMPLOYEE_API_BASE_URL + '/add', product);
    }
    edit(product) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/edit', product);
    }

    delete(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + 'delete/' + id);
    }

}

export default new nhaphangService();