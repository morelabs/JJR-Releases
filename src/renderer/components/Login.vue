<template>
  <div id="wrapper">
    <main>
      <div class="title">
        <img src="~@/assets/images/icon.png">
        <h1>Justicia Penal Juvenil</h1>
        <div style="color: #999; font-size: 15px;">Justicia restaurativa</div>
      </div>
      <div class="login-container">
        <el-form
          ref="loginForm" 
          :model="credentials">
          <el-form-item>
            <el-select
              v-model="credentials.region"
              :clearable="true"
              name="region"
              style="width: 100%;"
              placeholder="Selecciona juridiccion">
              <el-option
                value="san_isidro"
                label="San Isidro"/>
              <el-option
                value="pergamino"
                label="Pergamino"/>
              <el-option
                value="tigre"
                label="Tigre"/>
              <el-option
                value="tandil"
                label="Tandil"/>
            </el-select>
          </el-form-item>
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
      </div>
    </main>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: authActions } = namespace("auth");

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      credentials: {
        region: "",
        username: "",
        password: ""
      }
    };
  },
  computed: {
    isValidData() {
      return (
        this.credentials.username &&
        this.credentials.region &&
        this.credentials.password
      );
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
          this.$notify.success({
            title: "Bienvenido",
            message: "Logueado recien como..."
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
          this.$notify.error({
            title: "Error",
            message: message,
            duration: 10000
          });
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
.login-container {
  width: 30%;
  margin: auto;
}
.title {
  width: 30%;
  margin: 20px auto;
  text-align: center;
  border-bottom: solid 1px #ccc;
  padding-bottom: 10px;
}
.title h1 {
  margin: 10px 0px;
}
.title img {
  width: 80px;
  margin: auto;
}
</style>
