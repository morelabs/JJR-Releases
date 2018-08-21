<template>
  <div>
    <div class="items">
      <div
        :class="collapsed ? 'collapsed': ''"
        class="group-left">
        <div class="item">2018 &#174; <span v-if="!collapsed">Morelabs</span></div>
        <!-- <div class="item">Vue.js: <b>{{ vue }}</b></div>
        <div class="item">Electron: <b>{{ electron }}</b></div>
        <div class="item">Node: <b>{{ node }}</b></div>
        <div class="item">Platforma: <b>{{ platform }}</b></div> -->
      </div>
      <div class="group-right">
        <div class="item">
          Entraste como
          <span class="highlight">
            {{ user.first_name }} {{ user.last_name }}
          </span>
          <span v-if="user.signed_in">
            a las {{ user.signed_in | moment("HH:mm [hs]") }} del {{ user.signed_in | moment("DD/MM/Y") }}
          </span>
        </div>
        <div class="item">{{ appName }} - v{{ version }}</div>
        <div class="item">
          <el-tooltip
            :content="'Estado de la conexion: ' + (online ? 'OK' : 'ERROR')"
            effect="dark"
            placement="top">
            <fw-icon
              :class="online ? 'green' : 'red'"
              icon="circle"/>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
import { mkdir } from "fs";
const { mapGetters: authGetters } = namespace("auth");
const appPackage = require("../../../../package.json");

export default {
  name: "SystemInformation",
  props: {
    online: {
      type: Boolean,
      required: true
    },
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      electron: process.versions["atom-shell"],
      name: this.$route.name,
      node: process.versions.node,
      path: this.$route.path,
      platform: require("os").platform(),
      vue: require("vue/package.json").version
    };
  },
  computed: {
    ...authGetters(["user", "app"]),
    appName() {
      return appPackage.build.productName;
    },
    version() {
      return appPackage.version;
    }
  },
  created() {
    this.region = localStorage.getItem("region").replace(/_/, " ");
  }
};
</script>

<style scoped>
.items {
  padding-left: 10px;
  padding-right: 20px;
}
.items .group-left {
  float: left;
}
.items .group-left.collapsed {
  float: left;
  width: 70px;
}
.items .group-right {
  float: right;
}
.items .group-left .item {
  display: inline-block;
  margin-right: 10px;
  text-align: center;
  color: #fff;
}
.items .group-right .item {
  display: inline-block;
  margin-left: 10px;
  text-align: center;
  color: #333;
}
.fa-circle.green {
  color: #27be12;
}
.fa-circle.red {
  color: #f04b38;
}
.item .highlight {
  color: #2561a1;
  margin: 0px 5px;
}
</style>
