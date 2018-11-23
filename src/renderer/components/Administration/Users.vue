<template>
  <div
    v-loading="loading"
    class="list">
    <el-table
      :data="users"
      style="width: 100%">
      <el-table-column
        prop="first_name"
        label="Nombre"/>
      <el-table-column
        prop="last_name"
        label="Apellido"/>
      <el-table-column
        prop="email"
        label="Email"/>
      <el-table-column
        prop="username"
        label="Usuario"/>
    </el-table>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: configGetters, mapActions: configActions } = namespace(
  "admin"
);
export default {
  name: "AdminUsers",
  data() {
    return {
      loading: false,
      users: []
    };
  },
  created() {
    this.loadUsers();
  },
  methods: {
    ...configActions(["fetchUsers"]),
    loadUsers() {
      this.loading = true;
      this.fetchUsers({ criteria: "", page: 1 })
        .then(response => {
          this.users = response["users"];
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.list {
  padding: 20px 40px;
}
</style>
