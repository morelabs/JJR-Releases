<template>
  <div class="user-logout">
    <el-popover
      v-model="confirmLogout"
      placement="right"
      width="160">
      <p>Estas seguro de salir?</p>
      <div style="text-align: right; margin: 0">
        <el-button
          size="mini"
          type="text"
          @click="confirmLogout = false">Cancelar</el-button>
        <el-button
          type="danger"
          size="mini"
          @click="closeSession()">Si, salir</el-button>
      </div>
      <a
        slot="reference"
        href="#"
        class="logout"
        @click="confirmLogout = true">
        <span>{{ collapsed ? 'Salir' : 'Cerrar sesion' }}</span>
      </a>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "LogoutButton",
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      confirmLogout: false
    };
  },
  methods: {
    closeSession() {
      this.$emit("confirm-logout");
    }
  }
};
</script>

<style>
.user-logout {
  padding-top: 5px;
}
.user-logout .logout {
  color: #f56c6c !important;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
