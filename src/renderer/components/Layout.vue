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
      <div
        id="currentJurisdiction"
        @click="setDefaultModal = true">
        <span
          v-if="user.jurisdiction.default"
          class="jur-mark"><i class="el-icon-check"></i>
        </span>
        {{ user.jurisdiction.name }}
      </div>

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
    <el-dialog
      :visible.sync="setDefaultModal"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      title="Seleccione Jurisdiccion">
      <div style="padding: 20px 0px;">
        <el-select
          v-model="defaultJurisdiction"
          clearable
          placeholder="Select"
          style="width: 100%;">
          <el-option
            v-for="item in user.jurisdiction_list"
            :key="item.value"
            :label="item.name"
            :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.role }}</span>
            <span
              v-if="item.default"
              style="float: right; color: #27be12; margin: 0px 10px; font-size: 15px;"><i class="el-icon-check"></i></span>
          </el-option>
        </el-select>
        <div style="color: #F56C6C; margin: 10px 3px;">
          <el-switch
            v-model="setJurDefault"
            active-color="#13ce66"
            inactive-text="Cambiar de jurisdiccion"
            active-text="Cambiar de jurisdiccion y guardar como default"
            style="display: block"/>
        </div>
        <hr>
        <div slot="footer">
          <div style="text-align: right;">
            <el-button
              :disabled="!defaultJurisdiction && !user.jurisdiction.id"
              @click="setDefaultModal = false">Cancelar</el-button>
            <el-button
              type="primary"
              @click="setDefaultJurisdiction()">Guardar</el-button>
          </div>
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
      setDefaultModal: false,
      defaultJurisdiction: null,
      setJurDefault: false,
      message: ""
    };
  },
  computed: {
    ...authGetters(["user"])
  },
  created() {
    // listen network connection
    this.$on("online", function() {
      this.onlineState = true;
      this.toggleModal();
    });
    this.$on("offline", function() {
      this.onlineState = false;
      this.toggleModal();
    });

    // Manage updates
    ipcRenderer.send("start-connection", {});

    ipcRenderer.on("message", (event, message) => {
      console.log(event);
      console.log(message);
      this.message = message.data;
    });

    // manage menu commands
    ipcRenderer.on("command", (event, message) => {
      console.log(event);
      console.log(message);
      if (message.status === "search") {
        this.openSearchModal();
      } else if (message.status === "new") {
        this.$router.push({ name: message.data });
      }
    });
    let currentJur = localStorage.getItem("current");
    console.log("CurrentJur", currentJur);
    if (!currentJur) {
      this.setDefaultModal = true;
    }
  },
  methods: {
    ...authActions(["logout", "setJurisdiction"]),
    closeSession() {
      this.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    },
    toggleCollapse(value) {
      this.collapsed = value;
    },
    openSearchModal() {
      let modal = this.$refs.search;
      modal.openSearch();
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
    },
    checkUpdate() {
      ipcRenderer.send("start-connection");
    },
    setDefaultJurisdiction() {
      this.setJurisdiction({
        jursidictionUserId: this.defaultJurisdiction,
        isDefault: this.setJurDefault
      })
        .then(() => {
          this.setDefaultModal = false;
          this.defaultJurisdiction = null;
          this.setJurDefault = false;
        })
        .catch(error => {
          console.log("Error", error);
        });
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
  z-index: 100;
  background: #fff;
  width: 100%;
  padding: 10px 20px;
}

.page .page-footer {
  bottom: 1px;
  left: 0px;
  position: absolute;
  width: 100%;
  z-index: 100;
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
  margin-right: 70px;
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
.el-popover {
  z-index: 20000;
}
#currentJurisdiction {
  background: rgb(39, 46, 54);
  text-align: center;
  font-size: 15px;
  margin: 15px 10px;
  padding: 20px;
  cursor: pointer;
}
#currentJurisdiction .jur-mark {
  color: #27be12;
  float: left;
  border: solid 1px #27be12;
  border-radius: 100%;
  height: 1rem;
  width: 1rem;
  padding: 2px;
  margin: 0px 10px 0px -10px;
}
</style>
