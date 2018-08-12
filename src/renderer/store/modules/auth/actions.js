import * as types from "../types";
import axios from "axios";

const checkUser = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    if (token) {
      commit(types.UPDATE_CURRENT_USER, { token: token });
      resolve(true);
    } else {
      commit(types.LOGIN_ERROR);
      reject("No user logged in");
    }
  });
};

const login = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem("region", payload.region);
    axios
      .post("/login", { auth: payload })
      .then(response => {
        const token = response.data.auth_token;
        commit(types.LOGIN_SUCCESS, { token: token });
        resolve(response);
      })
      .catch(error => {
        commit(types.LOGIN_ERROR);
        reject(error);
      });
  });
};

const logout = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit(types.LOGOUT_SUCCESS);
    resolve();
  });
};

export default {
  checkUser,
  login,
  logout
};
