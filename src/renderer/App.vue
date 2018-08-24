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
      this.checkUser()
        .then(response => {
          this.loading = false;
        })
        .catch(error => {
          this.$message.error(error);
          this.$router.push({ name: "login" });
          this.loading = false;
        });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Ubuntu");
html,
body {
  background-color: #fff !important;
  height: 100%;
  font-family: Ubuntu;
  margin: 0px;
}
body {
  -ms-overflow-style: scrollbar;
  -webkit-app-region: drag;
}
#app {
  height: 100%;
  overflow-y: scroll;
}
footer {
  position: absolute;
  width: 100%;
  bottom: 0px;
  height: 2.2em;
  line-height: 2.2em;
  z-index: 1000;
  font-size: 13px;
  background: transparent;
}
</style>
