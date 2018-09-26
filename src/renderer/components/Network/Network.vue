<template>
  <div style="margin: 0px;">
    <div class="network-header">
      <router-link :to="{ name: 'organizations' }">Organizaciones</router-link>
      <router-link :to="{ name: 'programs' }">Programas</router-link>
      <router-link :to="{ name: 'referents' }">Referentes</router-link>
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
.network-header {
  border-bottom: solid 2px #f1f1f1;
  text-align: center;
}
.network-header a {
  height: 3em;
  line-height: 3em;
  padding: 15px;
  background: transparent;
  color: #888;
}

.network-header a.router-link-exact-active {
  background: rgb(112, 151, 196);
  color: #fff;
}
</style>
