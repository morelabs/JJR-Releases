<template>
  <div id="layout">
    <nav>
      <a
        href="#" 
        @click="closeSession()">Salir</a>
    </nav>
    <div
      v-loading="loading"
      class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: authActions } = namespace("auth");

export default {
  name: "Layout",
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.checkLogged();
  },
  methods: {
    ...authActions(["checkUser", "logout"]),
    checkLogged() {
      this.loading = true;
      this.checkUser()
        .then(response => {
          this.loading = false;
        })
        .catch(error => {
          this.$message.error(error);
          this.$router.push({ name: "login" });
        });
    },
    closeSession() {
      this.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    }
  }
};
</script>

<style>
#layout {
  background: #f1f1f1;
  padding: 10px;
}
.main-title {
  text-align: center;
  font-size: 12px;
}
.wrapper,
nav {
  height: 100%;
  width: 70%;
  margin: 0px auto;
}
</style>
