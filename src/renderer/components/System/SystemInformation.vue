<template>
  <div>
    <div class="items">
      <div class="group-left">
        <div class="item">2018 &#174; Morelabs</div>
        <!-- <div class="item">Vue.js: <b>{{ vue }}</b></div>
        <div class="item">Electron: <b>{{ electron }}</b></div>
        <div class="item">Node: <b>{{ node }}</b></div>
        <div class="item">Platforma: <b>{{ platform }}</b></div> -->
      </div>
      <div class="group-right">
        <div class="item">
          Conectado como
          <span class="highlight">{{ user.first_name }} {{ user.last_name }} </span>
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

export default {
  name: "SystemInformation",
  props: {
    online: {
      type: Boolean,
      required: true
    },
    appName: {
      type: String,
      required: true
    },
    version: {
      type: String,
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
      vue: require("vue/package.json").version,
      region: ""
    };
  },
  computed: {
    ...authGetters(["user", "app"])
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
.items .group-right {
  float: right;
}
.items .group-left .item {
  display: inline-block;
  margin-right: 10px;
  text-align: center;
}
.items .group-right .item {
  display: inline-block;
  margin-left: 10px;
  text-align: center;
}
.fa-circle.green {
  color: #27be12;
}
.fa-circle.red {
  color: #f04b38;
}
.item .highlight {
  color: #f56c6c;
}
</style>
