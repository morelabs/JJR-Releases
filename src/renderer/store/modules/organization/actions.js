import * as types from "../types";
import axios from "axios";

const fetchOrganizations = ({ commit }, { criteria, page }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`organizations?page=${page}&criteria=${criteria}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const fetchOrganization = ({ commit }, { organizationId }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`organizations/${organizationId}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addOrganization = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("organizations", { organization: payload })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const updateOrganization = ({ commit }, { organizationId, payload }) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`organizations/${organizationId}`, { organization: payload })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  fetchOrganizations,
  fetchOrganization,
  updateOrganization,
  addOrganization
};
