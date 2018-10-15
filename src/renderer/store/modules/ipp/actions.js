import axios from "axios";

const checkDNI = ({ commit, state }, { dni }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/users?dni=${dni}`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const fetchIpps = ({ commit }, { criteria, page, pageSize }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`ipp_cases?page=${page}&criteria=${criteria}&limit=${pageSize}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const fetchIpp = ({ commit }, { ippId }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`ipp_cases/${ippId}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  checkDNI,
  fetchIpps,
  fetchIpp
};
