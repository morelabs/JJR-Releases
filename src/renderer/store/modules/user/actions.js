import * as types from "../types";
import axios from "axios";

const fetchUsers = ({ commit }, { criteria, page }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`users?page=${page}&criteria=${criteria}`)
      .then(response => {
        console.log("From user actions", response.data);
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  fetchUsers
};
