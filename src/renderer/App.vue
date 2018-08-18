<template>
  <div
    v-loading="loading"
    id="app">
    <router-view/>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: authActions, mapGetters: authGetters } = namespace("auth");

export default {
  name: "JpjFrontend",
  data() {
    return {
      onlineState: navigator.onLine,
      loading: false
    };
  },
  created() {
    this.checkLogged();
  },
  methods: {
    ...authActions(["checkUser", "logout"]),
    checkLogged() {
      console.log("Checking user...");
      this.loading = true;
      setTimeout(() => {
        this.checkUser()
          .then(response => {
            this.loading = false;
          })
          .catch(error => {
            this.$message.error(error);
            this.$router.push({ name: "login" });
            this.loading = false;
          });
      }, 2000);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Ubuntu");
html,
body {
  background-color: #f1f1f1 !important;
  height: 100%;
  font-family: Ubuntu;
  margin: 0px;
}
#app {
  height: 100%;
  overflow-y: scroll;
}
footer {
  position: absolute;
  border-top: solid 1px #f1f1f1;
  width: 100%;
  bottom: 0px;
  height: 2em;
  line-height: 2em;
  z-index: 1000;
  font-size: 13px;
  color: #333;
  background-color: #fff;
}
</style>
