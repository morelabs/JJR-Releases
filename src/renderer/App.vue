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
  name: "JjrFrontend",
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
@import url("https://fonts.googleapis.com/css?family=Montserrat");

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
</style>
