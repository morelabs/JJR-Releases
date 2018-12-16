import * as types from "../types";
import axios from "axios";
import JWTDecode from "jwt-decode";

const checkUser = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JWTDecode(token);
      localStorage.setItem("current", JSON.stringify(user.jurisdiction));
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
        localStorage.setItem("current", JSON.stringify(user.jurisdiction));
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

const checkConn = ({ commit }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios
        .get("/check")
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    }, 5000);
  });
};

const setJurisdiction = ({ commit }, { jursidictionUserId, isDefault }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`users/set_default_jurisdiction`, {
        jur_id: jursidictionUserId,
        is_default: isDefault
      })
      .then(response => {
        localStorage.setItem(
          "current",
          JSON.stringify(response.data.jurisdiction)
        );
        commit(types.SET_JURISDICTION, response.data);
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  checkUser,
  login,
  logout,
  checkConn,
  setJurisdiction
};
