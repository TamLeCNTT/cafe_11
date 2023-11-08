import { db } from "../config/firebase";
import { set, ref, onValue, remove } from "firebase/database";
import axios from "axios";
import axiosClient from "./Main";
const SCHEMA = "student";
class StudentService {
  getAll() {
    const url = `${SCHEMA}.json`;
    return axiosClient.get(url);
  }
  update(data) {
    const url = `/${SCHEMA}/${data.name}.json`;
    return axiosClient.put(url, data);
  }
  delete(data) {
    const url = `/${SCHEMA}/${data.name}.json`;
    return axiosClient.delete(url, data);
  }
}

export default new StudentService();
