<template>
  <el-container>
    <el-aside
      :class="collapsed ? 'collapsed' : ''"
      class="main-side-menu">
      <main-side-menu
        :user="user"
        @open-search-modal="openSearchModal()"
        @confirm-logout="closeSession()"
        @toggle-collapse="(value) => toggleCollapse(value)"/>
    </el-aside>
    <el-main>
      <transition
        name="slide-right"
        mode="out-in">
        <router-view/>
      </transition>
      <main-search ref="search"/>
    </el-main>
    <el-dialog
      :visible.sync="showModal"
      :fullscreen="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :center="true"
      custom-class="no-connection"
      title="Se perdio la conexion!">
      <div style="text-align: center;padding: 60px;">
        <div v-if="!message">
          <div style="font-size: 40px; color: #f56c6c;">
            <i class="icono-arg-tecnovigilancia"></i>
          </div>
          <div style="font-size: 30px">
            <p>No podemos trabajar sin conexion :(</p>
            <p>Verifique la red en su casa: el router si tiene uno, o comuniquese con su proveedor de internet.</p>
          </div>
        </div>
        <div v-else>
          <div style="font-size: 40px; color: #67c23a;">
            <i class="icono-arg-sustancias-ok"></i>
          </div>
          <div style="font-size: 30px;">{{ message }}</div>
        </div>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import MainSearch from "@/components/Shared/MainSearch";
import MainSideMenu from "@/components/Layout/MainSideMenu";
import { ipcRenderer } from "electron";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: authActions, mapGetters: authGetters } = namespace("auth");

export default {
  name: "Layout",
  components: {
    MainSearch,
    MainSideMenu
  },
  data() {
    return {
      loading: false,
      confirmLogut: false,
      collapsed: false,
      showModal: false,
      message: ""
    };
  },
  computed: {
    ...authGetters(["user"])
  },
  created() {
    this.$on("online", function() {
      this.onlineState = true;
      this.toggleModal();
    });
    this.$on("offline", function() {
      this.onlineState = false;
      this.toggleModal();
    });
    ipcRenderer.on("command", (ev, data) => {
      if (data.message === "gsearch") {
        this.openSearchModal();
      } else {
        this.$router.push({ name: data.message });
      }
    });
  },
  methods: {
    ...authActions(["logout"]),
    closeSession() {
      this.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    },
    toggleCollapse(value) {
      this.collapsed = value;
    },
    openSearchModal() {
      this.$refs.search.openSearch();
    },
    toggleModal() {
      if (this.showModal) {
        this.message = "Volvimos a conectarnos!";
        setTimeout(() => {
          this.showModal = false;
        }, 2000);
      } else {
        this.message = "";
        this.showModal = true;
      }
    }
  }
};
</script>

<style>
.el-container {
  height: 100vh;
}
/* side menu effect */
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

.el-main {
  padding: 0px;
  overflow-x: hidden;
}
.page {
  height: 100%;
  position: relative;
}
.page .page-header {
  top: 0px;
  left: 0px;
  height: 4em;
  line-height: 4em;
  border-bottom: solid 1px #eee;
  position: absolute;
  z-index: 1000;
  background: #fff;
  width: 100%;
  padding: 10px 20px;
}

.page .page-footer {
  bottom: 1px;
  left: 0px;
  position: absolute;
  width: 100%;
  z-index: 1000;
  background: #fff;
  border-top: solid 1px #eee;
  padding: 13px 20px;
}
.page .page-footer .el-pagination__rightwrapper {
  margin-right: 80px;
}
.page .page-header h2 {
  margin: 5px 20px;
}
.page .page-header .sep {
  color: #999;
  margin: 0px 10px;
}
.page .page-header .controls {
  float: right;
  margin-right: 90px;
}

.page .page-content .page-form .el-form-item {
  margin-bottom: 0px;
}
.page .page-content {
  position: absolute;
  top: 5em;
  bottom: 3em;
  left: 0px;
  right: 0px;
  overflow: auto;
  padding: 10px 10px;
}
.page .page-content .list {
  padding: 0px 20px;
}
.page .page-content.no-bottom {
  bottom: 0em;
}
.page .page-content .page-form {
  width: 80%;
  margin: auto;
}
</style>
