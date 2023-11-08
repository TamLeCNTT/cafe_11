import axios from 'axios';
// import authHeader from './JwtService';

import { db } from "../config/firebase";
import { set, ref, onValue, remove } from "firebase/database";

import axiosClient from "./Main";
const EMPLOYEE_API_BASE_URL = "http://192.168.1.39:3001/product";
const SCHEMA = "product";
class roleService {
    getAllfirebase() {
        const url = `${SCHEMA}.json`;
        return axiosClient.get(url);
        }
        getbyday(date) {
            const url = `${SCHEMA}/${date}.json`;
            return axiosClient.get(url);
          }
        update(data) {
          console.log(data)
        const url = `/${SCHEMA}/${data.productID}.json`;
        return axiosClient.patch(url, data);
      }
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