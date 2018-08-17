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

export default {
  checkDNI
};
