import * as types from "../types";
import axios from "axios";

const savePersonData = ({ commit }, { personId, params }) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`people/${personId}`, { person: params })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addContact = ({ commit }, { personId, params }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`people/${personId}/add_contact`, { contact: params })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const removeContact = ({ commit }, { personId, contactId }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`people/${personId}/remove_contact`, { contact_id: contactId })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addResponsible = ({ commit }, { personId, params }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`people/${personId}/add_responsible`, { responsible: params })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const removeResponsible = ({ commit }, { personId, responsibleId }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`people/${personId}/remove_responsible`, {
        responsible_id: responsibleId
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  savePersonData,
  addContact,
  removeContact,
  addResponsible,
  removeResponsible
};
