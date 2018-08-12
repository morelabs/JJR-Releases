<template>
  <div>
    <div class="items">
      <div class="group-left">
        <div class="item">2018 &#174;</div>
        <div class="item">Vue.js: <b>{{ vue }}</b></div>
        <div class="item">Electron: <b>{{ electron }}</b></div>
        <div class="item">Node: <b>{{ node }}</b></div>
        <div class="item">Platforma: <b>{{ platform }}</b></div>
      </div>
      <div class="group-right">
        <div class="item">User: {{ user.first_name }} {{ user.last_name }} - {{ user.role }}</div>
        <div class="item">
          Status 
          <fw-icon
            :class="online ? 'green' : 'red'"
            icon="circle"/>
        </div>
        <div class="item">Version: 1.0.0</div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: authGetters } = namespace("auth");

export default {
  name: "SystemInformation",
  props: {
    online: {
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
    ...authGetters(["user", "app"])
  }
};
</script>

<style scoped>
.items {
  width: 70%;
  margin: auto;
}
.items .group-left {
  float: left;
}
.items .group-right {
  float: right;
}
.items .group-left .item {
  display: inline-block;
  margin-right: 20px;
}
.items .group-right .item {
  display: inline-block;
  margin-left: 20px;
}
.fa-circle.green {
  color: green;
}
.fa-circle.red {
  color: red;
}
</style>
