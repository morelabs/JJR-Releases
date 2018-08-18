<template>
  <el-container
    style="height: 100%;">
    <el-aside
      :class="collapsed ? 'collapsed' : ''"
      class="main-side-menu">
      <div class="user-info">
        <div class="image">
          <a
            href="#"
            @click="collapsed = !collapsed">
            <img src="@/assets/images/man.png">
          </a>
        </div>
        <div class="user-name">
          <div class="name">{{ user.first_name }} {{ user.last_name }}</div>
          <div style="padding-top: 5px;">
            <el-popover
              v-model="confirmLogut"
              placement="right"
              width="160">
              <p>Estas seguro de salir?</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="confirmLogut = false">Cancelar</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="closeSession()">Si, salir</el-button>
              </div>
              <a
                slot="reference"
                href="#"
                class="logout"
                @click="confirmLogut = true">
                <fw-icon
                  :class="collapsed ? '' : 'hidden'"
                  icon="lock"/>
                <span :class="collapsed ? 'hidden' : ''">Cerrar sesion</span>
              </a>
            </el-popover>
          </div>
        </div>
      </div>
      <div
        class="search-form"
        @click="openSearchModal()">
        <span>Buscador avanzado...</span>
        <div style="float: right"><i class="el-icon-search"></i></div>
      </div>
      <div
        class="search-form-collapsed"
        @click="openSearchModal()">
        Buscar
      </div>
      <br>
      <div class="menu-items">
        <el-tooltip
          :disabled="!collapsed"
          class="item"
          effect="dark"
          content="Panel inicio"
          placement="right">
          <router-link
            :to="{ name: 'dashboard' }"
            class="menu-item dashboard">
            <i
              :class="collapsed ? 'hidden' : ''"
              class="icono-arg-justicia-negativo"></i>
            <span>Inicio</span>
            <div class="collapsed">
              <i
                style="font-size: 13px;"
                class="icono-arg-justicia-negativo"></i>
            </div>
          </router-link>
        </el-tooltip>
        <el-tooltip
          :disabled="!collapsed"
          class="item"
          effect="dark"
          content="Administracion"
          placement="right">
          <router-link
            :to="{ path: '/admin' }"
            class="menu-item dashboard admin">
            <i
              :class="collapsed ? 'hidden' : ''" 
              class="icono-arg-cambio-tecnologico"></i>
            <span>Administracion</span>
            <div class="collapsed">
              <i
                style="font-size: 13px;"
                class="icono-arg-cambio-tecnologico"></i>
            </div>
          </router-link>
        </el-tooltip>
        <h3><i class="icono-arg-declaracio-n-jurada-declaracion-jurada-rectificativa"></i> IPP</h3>
        <el-tooltip
          :disabled="!collapsed"
          class="item"
          effect="dark"
          content="Ingresar nuevo IPP"
          placement="right">
          <router-link
            :to="{ name: 'newIpp' }"
            class="menu-item item">
            <span>Nuevo IPP</span>
            <div class="collapsed">
              <i class="el-icon-edit"></i>
            </div>
          </router-link>
        </el-tooltip>
        <el-tooltip
          :disabled="!collapsed"
          class="item"
          effect="dark"
          content="Listado de IPPs"
          placement="right">
          <router-link
            :to="{ name: 'ipps' }"
            class="menu-item item">
            <span>Listado de IPP</span>
            <div class="collapsed">
              <i class="el-icon-document"></i>
            </div>
          </router-link>
        </el-tooltip>
        <el-tooltip
          :disabled="!collapsed"
          class="item"
          effect="dark"
          content="Listado de expedientes"
          placement="right">
          <router-link
            :to="{ name: 'files' }"
            class="menu-item item">
            <span>Expedientes</span>
            <div class="collapsed">
              <i class="el-icon-tickets"></i>
            </div>
          </router-link>
        </el-tooltip>
        <h3><i class="icono-arg-marcador-ubicacion-2"></i> Reportes</h3>
        <el-tooltip
          :disabled="!collapsed"
          class="item"
          effect="dark"
          content="Mapa Victimarios"
          placement="right">
          <router-link
            :to="{ path: '/map/victimizers' }"
            class="menu-item item">
            <span>Mapa Victimarios</span>
            <div class="collapsed">
              <i class="el-icon-location"></i>
            </div>
          </router-link>
        </el-tooltip>
        <el-tooltip
          :disabled="!collapsed"
          class="item"
          effect="dark"
          content="Estadisticas y reportes"
          placement="right">
          <router-link
            :to="{ path: '/report/origin' }"
            class="menu-item item">
            <span>Estadisticas</span>
            <div class="collapsed">
              <i class="el-icon-goods"></i>
            </div>
          </router-link>
        </el-tooltip>
      </div>
    </el-aside>
    <el-main class="jpj-main">
      <div class="jpj-main-inner">
        <transition
          name="slide-right"
          mode="out-in">
          <router-view/>
        </transition>
      </div>
      <main-search ref="search"/>
    </el-main>
    <footer>
      <system-information :online="onlineState"/>
    </footer>
  </el-container>
</template>

<script>
import SystemInformation from "@/components/System/SystemInformation";
import MainSearch from "@/components/Shared/MainSearch";
import { extend } from "lodash";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: authActions, mapGetters: authGetters } = namespace("auth");

export default {
  name: "Layout",
  components: {
    MainSearch,
    SystemInformation
  },
  data() {
    return {
      loading: false,
      collapsed: false,
      onlineState: navigator.onLine,
      confirmLogut: false
    };
  },
  computed: {
    ...authGetters(["user"])
  },
  created() {
    this.$on("online", function() {
      this.onlineState = true;
    });
    this.$on("offline", function() {
      this.onlineState = false;
    });
  },
  methods: {
    ...authActions(["logout"]),
    closeSession() {
      this.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    },
    openSearchModal() {
      this.$refs.search.openSearch();
    }
  }
};
</script>

<style>
.jpj-main {
  display: flex;
  flex-direction: column;
  flex: auto;
}
.jpj-main .jpj-main-inner {
  margin: 0px 0px 16px 0px;
  flex: auto;
  background: rgb(255, 255, 255);
  position: relative;
  overflow: hidden scroll;
}
a {
  text-decoration: none;
}
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
.el-aside.main-side-menu.collapsed {
  width: 100px !important;
}
.el-aside.main-side-menu.collapsed .name {
  font-size: 14px !important;
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

.el-aside.main-side-menu.collapsed a.item:hover .collapsed i,
.el-aside.main-side-menu.collapsed a.dashboard:hover .collapsed i,
.el-aside.main-side-menu.collapsed
  a.dashboard.router-link-exact-active
  .collapsed
  i,
.el-aside.main-side-menu.collapsed
  a.item.router-link-exact-active
  .collapsed
  i {
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
  padding: 10px 0px;
  width: 250px !important;
}

/* User info styles */
.user-info {
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.user-info .image {
  text-align: center;
}
.user-info .image img {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: solid 1px #fff;
}

.user-info:hover {
  color: #fff;
}
.user-info .name {
  font-size: 18px;
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
hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin: 40px 0px;
}
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
/* Page titles */
.page-header {
  height: 3em;
  line-height: 3em;
  border-bottom: solid 1px #f1f1f1;
  text-align: center;
  font-size: 20px;
  padding: 10px 20px;
}
</style>
