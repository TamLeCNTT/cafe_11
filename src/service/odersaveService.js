import axios from 'axios';
// import authHeader from './JwtService';
const EMPLOYEE_API_BASE_URL = "http://192.168.1.39:3001/odersave";

class odersaveService {

    getall() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/all');
    }
    async getbyban(id) {
        return await axios.get(EMPLOYEE_API_BASE_URL + '/ban/' + id);
    }
    async getbyngay(id) {
        return await axios.get(EMPLOYEE_API_BASE_URL + '/ngay/' + id);
    }
    async getbymonth(id) {
        return await axios.get(EMPLOYEE_API_BASE_URL + '/month/' + id);
    }
    async getbyyear(id) {
        return await axios.get(EMPLOYEE_API_BASE_URL + '/year/' + id);
    }
    async add(oder) {
        return await axios.post(EMPLOYEE_API_BASE_URL + '/add', oder);
    }
    async edit(id, oder) {
        return await axios.put(EMPLOYEE_API_BASE_URL + '/' + id, oder);
    }

    async delete(id) {
        return await axios.delete(EMPLOYEE_API_BASE_URL + '/' + id);
    }

}

export default new odersaveService();