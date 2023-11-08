import axios from 'axios';
// import authHeader from './JwtService';
const EMPLOYEE_API_BASE_URL = "http://192.168.1.39:3001/cohuu";

class cohuuService {

    getall() {
        return axios.get(EMPLOYEE_API_BASE_URL + '/all');
    }
    async getbyban(id) {
        return await axios.get(EMPLOYEE_API_BASE_URL + '/ban/' + id);
    }
    async getbyngay(id) {
        return await axios.get(EMPLOYEE_API_BASE_URL + '/ngay/' + id);
    }
    async getbyhonngay(id) {
        return await axios.get(EMPLOYEE_API_BASE_URL + '/honngay/' + id);
    }
    async getbymonth(id) {
        return await axios.get(EMPLOYEE_API_BASE_URL + '/thang/' + id);
    }
    async getbyyear(id) {
        return await axios.get(EMPLOYEE_API_BASE_URL + '/nam/' + id);
    }
    async add(cohuu) {
        return await axios.post(EMPLOYEE_API_BASE_URL + '/add', cohuu);
    }
    async edit(id, cohuu) {
        return await axios.put(EMPLOYEE_API_BASE_URL + '/' + id, cohuu);
    }

    async delete(id) {
        return await axios.delete(EMPLOYEE_API_BASE_URL + '/' + id);
    }

}

export default new cohuuService();