import axios from 'axios';
// import authHeader from './JwtService';
const EMPLOYEE_API_BASE_URL = "http://192.168.1.39:3001/user";

class userService {

    add(user) {
        return axios.post(EMPLOYEE_API_BASE_URL + '/add', user);
    }
    login(user) {
        return axios.post(EMPLOYEE_API_BASE_URL + '/login', user);
    }
    edit(user) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/edit', user);
    }

    delete(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + 'delete/' + id);
    }

}

export default new userService();