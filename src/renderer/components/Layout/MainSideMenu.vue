<template>
  <div>
    <el-tooltip
      :disabled="!collapsed"
      class="item"
      effect="dark"
      trigger="hover"
      placement="right">
      <div slot="content">
        <div style="text-align: center; color: #ccc;">
          <div>Usuario</div>
          <div style="font-size: 16px;">{{ user.first_name }} {{ user.last_name }}</div>
          <p>{{ user.email }}</p>
          <a href="/profile">Ver Perfil</a>
        </div>
      </div>
      <div class="user-info">
        <a
          href="#"
          class="image"
          @click="toggleMenu()">
          <img src="@/assets/images/man.png">
        </a>
        <div class="user-name">
          <div :class="collapsed ? 'hidden' : 'name'">
            <router-link
              :to="{ path: '/profile' }"
              style="color: #f1f1f1;">
              <div>{{ user.first_name }} {{ user.last_name }}</div>
              <small style="font-size: 12px;">{{ user.email }}</small>
            </router-link>
          </div>
          <logout-button
            :collapsed="collapsed"
            @confirm-logout="confirmLogout()"/>
        </div>
      </div>
    </el-tooltip>
    <search-button @open-search="openSearchModal()"/>
    <br>
    <div class="menu-items">
      <side-menu-item
        :collapsed="collapsed"
        :route-name="{ name: 'dashboard' }"
        :is-main="true"
        tooltip-content="Panel inicio"
        display-name="Inicio"
        icon="icono-arg-justicia-negativo"
        class-name="menu-item dashboard"/>
      <side-menu-item
        :collapsed="collapsed"
        :route-name="{ path: '/admin' }"
        :is-main="true"
        tooltip-content="Administracion"
        display-name="Administracion"
        icon="icono-arg-cambio-tecnologico"
        class-name="menu-item dashboard admin"/>
      <h3><i class="icono-arg-declaracio-n-jurada-declaracion-jurada-rectificativa"></i> IPP</h3>
      <side-menu-item
        :collapsed="collapsed"
        :route-name="{ name: 'newIpp' }"
        :is-main="false"
        tooltip-content="Ingresar nuevo IPP"
        display-name="Nuevo IPP"
        icon="el-icon-edit"
        class-name="menu-item"/>
      <side-menu-item
        :collapsed="collapsed"
        :route-name="{ name: 'ipps' }"
        :is-main="false"
        tooltip-content="Listado de IPP"
        display-name="IPPs"
        icon="el-icon-document"
        class-name="menu-item"/>
      <side-menu-item
        :collapsed="collapsed"
        :route-name="{ name: 'files' }"
        :is-main="false"
        tooltip-content="Listado de expedientes"
        display-name="Expedientes"
        icon="el-icon-tickets"
        class-name="menu-item"/>
      <h3><i class="icono-arg-marcador-ubicacion-2"></i> Reportes</h3>
      <side-menu-item
        :collapsed="collapsed"
        :route-name="{ path: '/map/victimizers' }"
        :is-main="false"
        tooltip-content="Mapa de hechos"
        display-name="Mapa de hechos"
        icon="el-icon-location"
        class-name="menu-item"/>
      <side-menu-item
        :collapsed="collapsed"
        :route-name="{ path: '/report/origin' }"
        :is-main="false"
        tooltip-content="Estadisticas y reportes"
        display-name="Estadisticas"
        icon="el-icon-menu"
        class-name="menu-item"/>
    </div>
  </div>
</template>

<script>
import LogoutButton from "./LogoutButton";
import SearchButton from "./SearchButton";
import SideMenuItem from "./SideMenuItem";

export default {
  name: "MainSideMenu",
  components: { LogoutButton, SearchButton, SideMenuItem },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    openSearchModal() {
      this.$emit("open-search-modal");
    },
    confirmLogout() {
      this.$emit("confirm-logout");
    },
    toggleMenu() {
      this.collapsed = !this.collapsed;
      this.$emit("collapse", this.collapsed);
    }
  }
};
</script>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
.el-aside.main-side-menu a.item .collapsed,
.el-aside.main-side-menu a.dashboard .collapsed {
  display: none;
}
/* Collapsed menu */
.el-aside.main-side-menu.collapsed .image img {
  width: 40px;
  height: 40px;
  /* transform: rotate(360deg); */
  transition-duration: 0.5s;
}
.el-aside.main-side-menu.collapsed a.item span,
.el-aside.main-side-menu.collapsed a.dashboard span,
.el-aside.main-side-menu.collapsed h3 {
  display: none;
}
.el-aside.main-side-menu.collapsed a.item,
.el-aside.main-side-menu.collapsed a.dashboard {
  text-align: center;
  padding: 10px 0px;
}
.el-aside.main-side-menu.collapsed a.item .collapsed i,
.el-aside.main-side-menu.collapsed a.dashboard .collapsed i {
  float: none !important;
  margin: 0px;
}
.el-aside.main-side-menu.collapsed a.item .collapsed,
.el-aside.main-side-menu.collapsed a.dashboard .collapsed {
  display: inline-block !important;
  float: none !important;
  border: solid 1px rgb(201, 196, 200);
  border-radius: 100%;
  height: 35px;
  line-height: 35px;
  width: 35px;
  text-align: center;
  vertical-align: middle;
  margin: 0px !important;
}
.el-aside.main-side-menu.collapsed a.item:hover .collapsed,
.el-aside.main-side-menu.collapsed a.dashboard:hover .collapsed,
.el-aside.main-side-menu.collapsed
  a.dashboard.router-link-exact-active
  .collapsed,
.el-aside.main-side-menu.collapsed a.item.router-link-exact-active .collapsed {
  color: #fff;
  border: solid 1px #fff;
}
.el-aside.main-side-menu.collapsed a.item.router-link-exact-active,
.el-aside.main-side-menu.collapsed a.dashboard.router-link-exact-active {
  background: rgb(112, 151, 196);
  color: #fff;
}
.el-aside.main-side-menu.collapsed a.item .collapsed,
.el-aside.main-side-menu.collapsed a.dashboard .collapsed {
  display: block;
  float: none !important;
  text-align: center;
}
.hidden {
  display: none;
}
/* Expanded Menu */
.el-aside.main-side-menu {
  background-color: rgb(51, 62, 76);
  color: rgb(201, 196, 200);
  width: 250px !important;
  transition: all 0.1s;
}
.el-aside.main-side-menu.collapsed {
  width: 70px !important;
  transition: all 1s;
}
/* User info styles */
.user-info {
  padding: 30px 10px 10px 10px;
  margin: 0px;
  text-align: center;
}
.user-info .image {
  text-align: center;
}

.user-info .image img {
  border-radius: 100%;
  border: solid 1px #fff;
  width: 60px;
  height: 60px;
  transition-duration: 1s;
}

.user-info:hover {
  color: #fff;
}
.user-info .name {
  font-size: 18px;
}
.collapsed .user-info .logout {
  font-size: 16px;
}
.user-info .logout {
  color: #f56c6c;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}
/* Menu items styles */
.menu-items {
  margin: 20px 0px;
}
.menu-items a.menu-item {
  color: rgb(201, 196, 200);
  display: block;
  padding: 10px;
}
.menu-items a.menu-item:hover {
  background: rgb(103, 111, 122);
  color: #fff;
}
.menu-items a.menu-item.router-link-exact-active {
  background: rgb(112, 151, 196);
  color: #fff;
}
.menu-items a.menu-item.admin.router-link-exact-active,
.menu-items a.menu-item.admin.router-link-active {
  background: rgb(103, 111, 122);
  color: #fff;
}
.menu-items a.menu-item span {
  padding-left: 35px;
}
.menu-items h3 i,
.menu-items .menu-item.dashboard i {
  float: left;
  margin-right: 10px;
  margin-top: -2px;
  font-size: 17px;
}
.menu-items .menu-item.dashboard span {
  padding-left: 0px;
  font-size: 17px;
}
.menu-items .menu-item.dashboard {
  margin: 15px 0px;
  padding: 10px 0px 10px 10px;
}
.menu-items h3 {
  margin: 15px 0px;
  padding: 10px 0px 10px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 17px;
}
/* Search styles */

.search-form,
.search-form-collapsed {
  padding: 10px;
  margin: 10px;
  background: rgb(103, 111, 122);
  border-color: transparent;
  color: #c7c7c7;
  opacity: 0.5;
  border-radius: 5px;
}
.search-form input:focus,
.search-form input:active,
.search-form input:hover {
  border-color: transparent;
  outline: none;
  padding: 5px 10px;
}
.search-form-collapsed {
  display: none;
}
.el-aside.main-side-menu.collapsed .search-form {
  display: none;
}
.el-aside.main-side-menu.collapsed .search-form-collapsed {
  display: block;
  text-align: center;
  cursor: pointer;
}
</style>
