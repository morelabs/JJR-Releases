import * as types from "../types";
import axios from "axios";

const fetchSubject = ({ commit }, { subjectId }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`subjects/${subjectId}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const addSubject = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("subjects", { subject: payload })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const updateSubject = ({ commit }, { subjectId, payload }) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`subjects/${subjectId}`, { subject: payload })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getDynamicOptionList = ({ commit }, { answerId, optionList }) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`answers/${answerId}?list=${optionList}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const updateAnswer = ({ commit }, { answerId, payload }) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(`answers/${answerId}`, { answer: payload })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  fetchSubject,
  updateSubject,
  addSubject,
  getDynamicOptionList,
  updateAnswer
};
