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
        <div class="image">
          <a
            href="#"
            class="image"
            @click="toggleMenu()">
            <img src="@/assets/images/man.png">
          </a>
        </div>
        <div :class="collapsed ? 'hidden' : 'name'">
          <router-link
            :to="{ path: '/profile' }">
            <div>{{ user.first_name }} {{ user.last_name }}</div>
            <small style="font-size: 12px;">{{ user.email }}</small>
          </router-link>
        </div>
        <logout-button
          :collapsed="collapsed"
          @confirm-logout="confirmLogout()"/>
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
        :route-name="{ path: '/admin/usuarios' }"
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
        display-name="IPPs / Expedientes"
        icon="el-icon-document"
        class-name="menu-item"/>
      <!-- <h3><i class="icono-arg-marcador-ubicacion-2"></i> Reportes</h3>
      <side-menu-item
        :collapsed="collapsed"
        :route-name="{ name: 'victimizerMap' }"
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
        class-name="menu-item"/> -->
      <h3><i class="icono-arg-codigo-genetico"></i> Red</h3>
      <side-menu-item
        :collapsed="collapsed"
        :route-name="{ path: '/red/organizaciones' }"
        :is-main="false"
        tooltip-content="Organismos e instituciones"
        display-name="Organizaciones"
        icon="el-icon-menu"
        class-name="menu-item"/>
      <side-menu-item
        :collapsed="collapsed"
        :route-name="{ path: '/red/programas' }"
        :is-main="false"
        tooltip-content="Programas de apoyo"
        display-name="Programas"
        icon="el-icon-menu"
        class-name="menu-item"/>
      <side-menu-item
        :collapsed="collapsed"
        :route-name="{ path: '/red/referentes' }"
        :is-main="false"
        tooltip-content="Referentes"
        display-name="Referentes"
        icon="el-icon-menu"
        class-name="menu-item"/>
    </div>
    <div class="footer">
      <system-information
        :online="onlineState"
        :collapsed="collapsed"/>
    </div>
  </div>
</template>

<script>
import SystemInformation from "@/components/System/SystemInformation";
import LogoutButton from "./LogoutButton";
import SearchButton from "./SearchButton";
import SideMenuItem from "./SideMenuItem";

export default {
  name: "MainSideMenu",
  components: { LogoutButton, SearchButton, SideMenuItem, SystemInformation },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      collapsed: false,
      onlineState: navigator.onLine || false
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
      this.$emit("toggle-collapse", this.collapsed);
    }
  }
};
</script>

<style>
.footer {
  bottom: 2em;
  font-size: 13px;
  background: transparent;
  position: absolute;
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
  transition: all 0.5s;
}
/* User info styles */
.user-info {
  padding: 30px 10px 10px 10px;
  margin: 0px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
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

.user-info:hover .name a {
  color: #fff;
}
.user-info .name a {
  font-size: 18px;
  color: rgb(201, 196, 200);
}

/* Menu items styles */
.menu-items {
  margin: 10px 0px;
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
.menu-items .menu-item.dashboard,
.menu-items .menu-item.dashboard.admin {
  margin: 0px;
  padding: 10px 0px 10px 10px;
}
.menu-items h3 {
  margin: 0px;
  padding: 10px 0px 10px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 17px;
}

.no-connection {
  background: #f1f1f1;
  color: #333;
}
</style>
