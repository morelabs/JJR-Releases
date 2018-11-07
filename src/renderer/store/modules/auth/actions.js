import * as types from "../types";
import axios from "axios";
import JWTDecode from "jwt-decode";

const checkUser = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JWTDecode(token);
      commit(types.UPDATE_CURRENT_USER, user);
      resolve(user);
    } else {
      commit(types.LOGIN_ERROR);
      reject("No user logged in");
    }
  });
};

const login = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/login", { auth: payload })
      .then(response => {
        const token = response.data.auth_token;
        let user = JWTDecode(token);
        console.log("Login action", user);
        commit(types.LOGIN_SUCCESS, { token: token, user: user });
        resolve(user);
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
