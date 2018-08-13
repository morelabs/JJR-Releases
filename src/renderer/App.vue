<template>
  <div id="app">
    <router-view/>
    <footer>
      <system-information :online="onlineState"/>
    </footer>
  </div>
</template>

<script>
import SystemInformation from "./components/System/SystemInformation";
export default {
  name: "JpjFrontend",
  components: { SystemInformation },
  data() {
    return {
      onlineState: navigator.onLine
    };
  },
  created() {
    this.$on("online", function() {
      this.onlineState = "I'm online now!";
    });
    this.$on("offline", function() {
      this.onlineState = "I'm offline now!";
    });
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Ubuntu");
html,
body {
  background-color: #f1f1f1 !important;
  height: 100%;
  font-family: Ubuntu;
  margin: 0px;
}
#app {
  height: 100%;
  overflow-y: scroll;
}
footer {
  position: absolute;
  border-top: solid 1px #ccc;
  width: 100%;
  bottom: 0px;
  height: 2em;
  line-height: 2em;
  z-index: 1000;
  font-size: 12px;
  background-color: #fff;
}
</style>
