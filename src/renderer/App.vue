<template>
  <div id="app">
    <div
      v-if="loading"
      style="text-align: center; height: 100%;">
      <div style="height: 300px; margin: 40px 0px;">
        <img
          src="~@/assets/images/connection.svg"
          height="300px">
      </div>
      <p class="loading-message">{{ message }}</p>
      <small class="loading-footer">Justicia Juvenil Restaurativa - v.{{ version }}</small>
    </div>
    <div
      v-else
      style="height: 100%;">
      <div v-if="checked">
        <router-view/>
      </div>
      <div
        v-else
        class="loading-error">
        <div><i class="el-icon-warning"></i></div>
        <div>
          No pudimos conectarnos al servidor.
          <br>
          <el-button
            type="primary"
            @click="checking()">Reintentar</el-button>
        </div>
        <small class="loading-footer">Justicia Juvenil Restaurativa - v.{{ version }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
import { ipcRenderer } from "electron";
const { mapActions: authActions } = namespace("auth");
const appPackage = require("../../package.json");

export default {
  name: "JjrFrontend",
  data() {
    return {
      loading: true,
      checked: false,
      version: appPackage.version,
      name: appPackage.name,
      message: null
    };
  },
  created() {
    this.checking();
  },
  methods: {
    ...authActions(["checkUser", "checkConn"]),
    checking() {
      this.message = "Conectando con el servidor...";
      this.loading = true;
      this.checkConn()
        .then(response => {
          this.checked = true;
          this.message = "Chequeando usuario...";
          this.checkLogged();
        })
        .catch(error => {
          this.loading = false;
          this.checked = false;
        });
    },
    checkLogged() {
      this.checkUser()
        .then(() => {
          this.$router.push({ name: "dashboard" });
        })
        .catch(() => {
          this.$router.push({ name: "login" });
        })
        .finally(() => {
          ipcRenderer.send("checked", true);
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Ubuntu");
@import url("https://fonts.googleapis.com/css?family=Montserrat");

$color-primary: #6577b2;
$color-secondary: #65b27a;
$color-danger: #b2659d;
$color-hazard: #e84747;

html {
  height: 100%;
}
body {
  background-color: #fff !important;
  height: 100%;
  margin: 0px;
  font-family: "Ubuntu", sans-serif;
  overflow: hidden;
}

#app {
  min-height: 100%;
}
a {
  text-decoration: none;
  color: #888;
}
a:active,
a:focus {
  outline: none;
  border: none;
}
hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin: 40px 0px;
}

.loading-message {
  margin: 10px 0px;
  color: $color-secondary;
}
.loading-footer {
  position: absolute;
  bottom: 2em;
  color: #999;
  left: 0px;
  width: 100%;
  font-size: 13px;
  text-align: center;
}
.loading-error {
  color: $color-hazard;
  display: flex;
  align-items: center;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  .el-button {
    margin: 20px 0px;
  }
  i {
    font-size: 40px;
    margin: 20px 0px;
  }
}
</style>
