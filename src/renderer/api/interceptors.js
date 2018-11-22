import axios from "axios";
import router from "../router";

export default function setup() {
  axios.defaults.baseURL = "http://localhost:3000"; // process.env.API_URL;
  axios.interceptors.request.use(
    function(config) {
      let token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      config.headers["Accept"] = "application/json";
      config.headers["Content-Type"] = "application/json";
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Access-Control-Allow-Headers"] =
        "Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin, Api-region";
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    response => {
      return Promise.resolve(response);
    },
    error => {
      if (error.response && error.response.status === 401) {
        router.push({ name: "login" });
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject(error);
      }
    }
  );
}
