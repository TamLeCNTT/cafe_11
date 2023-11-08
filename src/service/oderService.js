import axios from 'axios';
// import authHeader from './JwtService';
const EMPLOYEE_API_BASE_URL = "http://192.168.1.39:3001/oder";

class oderService {

    getall() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/all');
    }
    async getbyban(id) {
        return await axios.get(EMPLOYEE_API_BASE_URL + '/ban/' + id);
    }
    async add(oder) {
        return await axios.post(EMPLOYEE_API_BASE_URL + '/add', oder);
    }
    edit(id, oder) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + id, oder);
    }

    delete(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + id);
    }

}

export default new oderService();