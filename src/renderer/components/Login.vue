<template>
  <div id="wrapper">
    <div class="title">
      <img
        style="margin-top: 70px;"
        src="~@/assets/images/logo.png">
    </div>
    <div class="login-container">
      <div v-if="hasError">
        <el-alert
          :closable="false"
          :center="true"
          :title="message"
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
      <hr>
      <div style="text-align: center; clear: both;">
        <p>Versión: {{ version }}</p>
        <div>
          <img
            src="~@/assets/images/logo_funrepar.png"
            height="40">
        </div>
        <div>
          <img
            src="~@/assets/images/logo_morelabs.png"
            height="30">
        </div>
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
      message: null,
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
          if (error.message) {
            this.message = error.message;
          } else {
            this.message = error.authentication[0];
          }
          this.hasError = true;
        })
        .finally(() => {
          this.loading = false;
        });
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
  width: 180px;
  margin: auto;
}
</style>
