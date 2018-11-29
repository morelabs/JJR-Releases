<template>
  <div class="page">
    <div class="page-header">
      <h2>Administracion</h2>
    </div>
    <div
      class="page-content" 
      style="padding: 0px;bottom: 0px;">
      <div class="admin-header">
        <router-link :to="{ name: 'adminUsers' }">Usuarios</router-link>
        <router-link :to="{ name: 'adminConfig' }">Configuración</router-link>
      </div>
      <div class="scroll-inner">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin"
};
</script>

<style scoped>
.admin-header {
  border-bottom: solid 2px #f1f1f1;
  text-align: center;
  margin-top: 5px;
  position: absolute;
  left: 0;
  background: #fff;
  z-index: 1000;
  height: 3em;
  line-height: 3em;
  width: 100%;
}
.admin-header a {
  padding: 15px;
  background: transparent;
  color: #888;
}
.admin-header a.router-link-exact-active {
  background: rgb(112, 151, 196);
  color: #fff;
}

.scroll-inner {
  margin-top: 4em;
  overflow: scroll;
}
.el-tab-pane {
  padding: 0px 40px;
}
</style>
