import * as types from "../types";
import axios from "axios";

const fetchZones = ({ commit }, { criteria }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`zones?criteria=${criteria}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  fetchZones
};
