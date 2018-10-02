import * as types from "../types";
import axios from "axios";

const fetchReferents = ({ commit }, { criteria, page, pageSize }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`referents?page=${page}&criteria=${criteria}&limit=${pageSize}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const fetchReferent = ({ commit }, { referentId }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`referents/${referentId}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addReferent = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("referents", { referent: payload })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const updateReferent = ({ commit }, { referentId, payload }) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`referents/${referentId}`, { referent: payload })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  fetchReferents,
  fetchReferent,
  updateReferent,
  addReferent
};
