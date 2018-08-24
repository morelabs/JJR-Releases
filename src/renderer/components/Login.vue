<template>
  <div id="wrapper">
    <div class="title">
      <img src="~@/assets/images/logo.png">
      <h1>Justicia Penal Juvenil</h1>
      <div style="color: #999; font-size: 15px;">Justicia restaurativa</div>
    </div>
    <hr>
    <div class="login-container">
      <div v-if="hasError">
        <el-alert
          :closable="false"
          :center="true"
          title="No estas logueado"
          type="error"
          show-icon/>
        <br>
      </div>
      <el-form
        ref="loginForm" 
        :model="credentials">
        <el-form-item>
          <el-input
            v-model="credentials.username"
            name="username"
            placeholder="Ususario o email"
            prefix-icon="el-icon-message"/>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="credentials.password"
            name="password"
            type="password"
            placeholder="Contraseña"
            prefix-icon="el-icon-edit"/>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            :disabled="!isValidData"
            type="primary"
            style="width: 100%;"
            @click.native.prevent="authenticate()">Submit</el-button>
        </el-form-item>
      </el-form>
      <div style="font-size: 12px; color: #999; clear: both; overflow: auto;">
        <div style="float: left">{{ name }}</div>
        <div style="float: right"> v.{{ version }}</div>
      </div>
    </div>
    <div
      v-if="debug"
      class="debug">
      <span>DEBUG DATA - [ URL -> {{ envs.API_URL }} ] - [ ENV -> {{ envs.NODE_ENV }} ]</span>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: authActions } = namespace("auth");
const appPackage = require("../../../package.json");

export default {
  name: "Login",
  data() {
    return {
      debug: process.env.NODE_ENV === "development",
      loading: false,
      name: appPackage.build.productName,
      version: appPackage.version,
      envs: process.env,
      hasError: false,
      credentials: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    isValidData() {
      return this.credentials.username && this.credentials.password;
    }
  },
  created() {
    this.getRegionFromStorage();
  },
  methods: {
    ...authActions(["login"]),
    authenticate() {
      this.loading = true;
      this.login(this.credentials)
        .then(response => {
          console.log("Response in login", response);
          this.hasError = false;
          this.$notify.success({
            title: "Bienvenido",
            message: `Logueado recien como ${response.first_name} ${
              response.last_name
            }`,
            position: "bottom-left"
          });
          this.$router.push({ name: "dashboard" });
        })
        .catch(error => {
          let message;
          if (error.message) {
            message = error.message;
          } else {
            message = error.authentication[0];
          }
          this.hasError = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getRegionFromStorage() {
      this.credentials.region = localStorage.getItem("region");
    }
  }
};
</script>

<style scoped>
#wrapper {
  height: 100%;
  width: 30%;
  text-align: center;
  margin: auto;
}
.login-container {
  margin: 30px auto;
}
hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin: 40px 0px;
}
.debug {
  margin: 30px auto;
  border-top: solid 1px #f1f1f1;
  padding-top: 30px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.title {
  margin: 30px auto;
}
.title h1 {
  margin: 10px 0px;
}
.title img {
  width: 80px;
  margin: auto;
}
</style>
