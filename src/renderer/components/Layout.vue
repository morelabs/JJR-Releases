<template>
  <el-container
    style="height: 100%; border: 1px solid #eee">
    <el-aside
      width="10%"
      style="background-color: #fff">
      <div style="padding: 10px;">
        <p>{{ user.first_name }} {{ user.last_name }}</p>
        <router-link :to="{ name: 'dashboard' }">Panel</router-link>
        <a @click="closeSession()">Salir</a>
      </div>
    </el-aside>
    <el-main style="display: flex; flex-direction: column; flex: auto;">
      <div style="margin: 0px 0px 16px 0px; flex: auto; background: rgb(255, 255, 255);position: relative;overflow: hidden scroll;">
        <router-view/>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: authActions, mapGetters: authGetters } = namespace("auth");

export default {
  name: "Layout",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...authGetters(["user"])
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
