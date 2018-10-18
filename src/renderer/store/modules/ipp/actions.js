import axios from "axios";
import * as types from "../types";

const loadIppData = ({ commit, state }, { userId }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`ipp_cases/config_data?user_id=${userId}`)
      .then(response => {
        commit(types.LOAD_IPP_DATA, response.data);
        resolve(true);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const checkDNI = ({ commit, state }, { dni }) => {
  return new Promise((resolve, reject) => {
    axios
      .post("people/validate_user", { dni: dni })
      .then(response => {
        resolve(response.data);
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

const addIpp = ({ commit }, { ipp }) => {
  return new Promise((resolve, reject) => {
    axios
      .post("ipp_cases", { ipp_case: ipp })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addPerson = ({ commit }, { person, role }) => {
  return new Promise((resolve, reject) => {
    if (person.id) {
      commit(types.ADD_PERSON, { person: person, role: role });
      resolve(true);
    } else {
      axios
        .post("people", { person: person })
        .then(response => {
          commit(types.ADD_PERSON, {
            person: response.data.person,
            role: role
          });
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

const removePerson = ({ commit }, { personId, role }) => {
  return new Promise((resolve, reject) => {
    commit(types.REMOVE_PERSON, { personId: personId, role: role });
    resolve(true);
  });
};

const addPoliceStation = ({ commit }, { police_station }) => {
  return new Promise((resolve, reject) => {
    commit(types.ADD_POLICE_STATION, police_station);
    resolve(true);
  });
};

const removePoliceStation = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit(types.REMOVE_POLICE_STATION);
    resolve(true);
  });
};

const addDefinition = ({ commit }, { definition }) => {
  return new Promise((resolve, reject) => {
    commit(types.ADD_DEFINITION, definition);
    resolve(true);
  });
};

const removeDefintion = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit(types.REMOVE_DEFINITION);
    resolve(true);
  });
};

const addCrime = ({ commit }, { crime }) => {
  return new Promise((resolve, reject) => {
    commit(types.ADD_CRIME, crime);
    resolve(true);
  });
};

const removeCrime = ({ commit }, { crimeId }) => {
  return new Promise((resolve, reject) => {
    commit(types.REMOVE_CRIME, crimeId);
    resolve(true);
  });
};

const addObservation = ({ commit }, { observation }) => {
  return new Promise((resolve, reject) => {
    commit(types.ADD_OBSERVATION, observation);
    resolve(true);
  });
};

const removeObservation = ({ commit }, { observation }) => {
  return new Promise((resolve, reject) => {
    commit(types.REMOVE_OBSERVATION, observation);
    resolve(true);
  });
};

export default {
  loadIppData,
  checkDNI,
  fetchIpps,
  fetchIpp,
  addIpp,
  addPerson,
  removePerson,
  addCrime,
  removeCrime,
  addPoliceStation,
  removePoliceStation,
  addObservation,
  removeObservation,
  addDefinition,
  removeDefintion
};
