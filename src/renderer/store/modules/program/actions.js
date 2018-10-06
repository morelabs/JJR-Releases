import * as types from "../types";
import axios from "axios";

const fetchPrograms = ({ commit }, { criteria, page, pageSize }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`programs?page=${page}&criteria=${criteria}&limit=${pageSize}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const fetchProgram = ({ commit }, { programId }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`programs/${programId}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addProgram = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("programs", { program: payload })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const updateProgram = ({ commit }, { programId, payload }) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`programs/${programId}`, { program: payload })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  fetchPrograms,
  fetchProgram,
  updateProgram,
  addProgram
};
