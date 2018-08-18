<template>
  <div style="margin: 0px;">
    <div class="admin-header">
      <router-link :to="{ name: 'adminUsers' }">Usuarios</router-link>
      <router-link :to="{ name: 'adminCollaborators' }">Colaboradores</router-link>
      <router-link :to="{ name: 'adminInstitutions' }">Instituciones</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Admin"
};
</script>

<style>
.admin-header {
  border-bottom: solid 2px #f1f1f1;
  text-align: center;
}
.admin-header a {
  height: 3em;
  line-height: 3em;
  padding: 1em;
  color: #888;
}

.admin-header a.router-link-exact-active {
  background: rgb(112, 151, 196);
  color: #fff;
}
</style>
