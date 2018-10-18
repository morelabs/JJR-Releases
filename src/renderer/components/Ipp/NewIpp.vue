<template>
  <div class="ipp-form">
    <div class="step-indicator">
      <div style="padding: 20px 10px;">
        <el-steps 
          :active="active" 
          align-center
          wait-status="wait"
          process-status="finish"
          finish-status="success">
          <el-step
            title="Inicio"
            icon="icono-arg-firma-contrato icono-2x"/>
          <el-step
            title="Victimarios"
            icon="icono-arg-comunidad icono-2x"/>
          <el-step
            title="Victimas"
            icon="icono-arg-comunidad icono-2x"/>
          <el-step
            title="Hechos"
            icon="icono-arg-seguridad icono-2x"/>
          <el-step
            title="Origen"
            icon="icono-arg-justicia icono-2x"/>
          <el-step
            title="Resumen"
            icon="icono-arg-tramite icono-2x"/>
        </el-steps>
      </div>
    </div>
    <div
      v-loading="!enabled"
      class="step-content">
      <el-form>
        <div 
          v-if="active === 0" 
          class="ipp-form-wrapper">
          <basic-data @next="(value) => moveTo(value)"/>
        </div>
        <div 
          v-if="active === 1" 
          class="ipp-form-wrapper">
          <victimizers @next="(value) => moveTo(value)"/>
        </div>
        <div 
          v-if="active === 2" 
          class="ipp-form-wrapper">
          <victims @next="(value) => moveTo(value)"/>
        </div>
        <div 
          v-if="active === 3" 
          class="ipp-form-wrapper">
          <police-station @next="(value) => moveTo(value)"/>
        </div>
        <div 
          v-if="active === 4" 
          class="ipp-form-wrapper">
          <ipp-source @next="(value) => moveTo(value)"/>
        </div>
        <div 
          v-if="active === 5" 
          class="ipp-form-wrapper">
          <ipp-resumen @next="(value) => moveTo(value)"/>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import BasicData from "./Form/BasicData";
import Victimizers from "./Form/Victimizers";
import Victims from "./Form/Victims";
import PoliceStation from "./Form/PoliceStation";
import IppSource from "./Form/Source";
import IppResumen from "./Form/Resumen";

import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: ippActions } = namespace("ipp");
const { mapGetters: authGetters } = namespace("auth");
export default {
  name: "NewIpp",
  components: {
    BasicData,
    Victimizers,
    Victims,
    PoliceStation,
    IppSource,
    IppResumen
  },
  beforeRouteLeave(to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    if (this.hasChanges) {
      let yes = window.confirm(
        "Si salis de esta pagina vas a perder todo lo que cargaste del formlario."
      );
      if (yes) {
        this.resetIpp();
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  data() {
    return {
      active: 0,
      hasChanges: false,
      enabled: false
    };
  },
  computed: {
    ...authGetters(["user"])
  },
  created() {
    this.loadData();
  },
  methods: {
    ...ippActions(["resetIpp", "loadIppData"]),
    loadData() {
      let userId = this.user.user_id;
      this.loadIppData({ userId })
        .then(response => {
          this.enabled = true;
        })
        .catch(error => {
          this.enabled = false;
        });
    },
    moveTo(value) {
      this.hasChanges = true;
      this.active = value;
    }
  }
};
</script>

<style>
.ipp-form {
  height: 100%;
  padding: 5px;
}
.step-indicator {
  padding: 10px;
  border-bottom: solid 2px #f1f1f1;
  height: 120px;
}
.step-content {
  height: 100%;
  margin: 0px;
  padding: 0px 60px;
  flex: auto;
  background: rgb(255, 255, 255);
  position: relative;
  overflow: scroll;
}
.ipp-form {
  background: #fff;
  height: 100%;
}
.ipp-form-wrapper {
  position: relative;
  height: 100%;
  padding: 0px 10px;
}

.ipp-form-container {
  height: 100%;
}
.ipp-step-header {
  height: 50px;
  line-height: 50px;
  border-bottom: solid 2px #f1f1f1;
  margin-bottom: 10px;
  padding: 10px 5px;
  margin-top: 10px;
  text-align: center;
  font-size: 20px;
}

.ipp-step-inner {
  height: 635px;
  margin-top: 10px;
  padding: 5px;
  flex: auto;
  background: rgb(255, 255, 255);
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
