import * as types from "../types";
import axios from "axios";

const fetchConfig = ({ commit }, { criteria }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`current_config?criteria=${criteria}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const fetchUsers = ({ commit }, { criteria, page }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`admin/users?page=${page}&criteria=${criteria}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const fetchUser = ({ commit }, { userId }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`admin/users/${userId}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addUser = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("admin/users", { referent: payload })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const updateUser = ({ commit }, { userId, payload }) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`admin/users/${referentId}`, { referent: payload })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  fetchConfig,
  fetchUsers,
  fetchUser,
  updateUser,
  addUser
};
