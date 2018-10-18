<template>
  <el-container style="height: 100%;">
    <el-aside
      :class="collapsed ? 'collapsed' : ''"
      class="main-side-menu">
      <main-side-menu
        :user="user"
        @open-search-modal="openSearchModal()"
        @confirm-logout="closeSession()"
        @toggle-collapse="(value) => toggleCollapse(value)"/>
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
    </el-main>
    <footer>
      <system-information
        :online="onlineState"
        :collapsed="collapsed"/>
    </footer>
  </el-container>
</template>

<script>
import SystemInformation from "@/components/System/SystemInformation";
import MainSearch from "@/components/Shared/MainSearch";
import MainSideMenu from "@/components/Layout/MainSideMenu";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: authActions, mapGetters: authGetters } = namespace("auth");

export default {
  name: "Layout",
  components: {
    MainSearch,
    SystemInformation,
    MainSideMenu
  },
  data() {
    return {
      loading: false,
      onlineState: navigator.onLine || false,
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
.jpj-main {
  display: flex;
  flex-direction: column;
  flex: auto;
  padding: 0px;
}
.jpj-main .jpj-main-inner {
  margin: 0px 0px 10px 0px;
  flex: auto;
  background: rgb(255, 255, 255);
  position: relative;
  overflow: scroll;
}
a {
  text-decoration: none;
  color: #888;
}
a:active,
a:focus {
  outline: none;
  border: none;
}
hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin: 40px 0px;
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

/* Page titles */
.el-header {
  height: initial !important;
}

.page-header {
  height: 60px;
  line-height: 60px;
  border-bottom: solid 1px #eee;
  padding: 0px 20px 30px 20px;
}

.page-header h2 {
  float: left;
  margin: 10px 0px;
}
.page-header .controls {
  float: right;
  margin: 10px 0px;
}
.no-connection {
  background: #f1f1f1;
  color: #333;
}
</style>
