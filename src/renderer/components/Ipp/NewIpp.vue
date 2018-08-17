<template>
  <div class="ipp-form">
    <div class="step-indicator">
      <el-steps
        :active="active"
        align-center>
        <el-step
          title="Inicio"
          description="Informacion Basica"
          icon="icono-arg-firma-contrato icono-2x"/>
        <el-step
          title="Involucrados I"
          description="Victimarios"
          icon="icono-arg-comunidad icono-2x"/>
        <el-step
          title="Involucrados II"
          description="Victimas"
          icon="icono-arg-comunidad icono-2x"/>
        <el-step
          title="Hechos"
          description="Datos de los hechos"
          icon="icono-arg-seguridad icono-2x"/>
        <el-step
          title="Origen"
          description="Monitoreo y asignacion"
          icon="icono-arg-justicia icono-2x"/>
        <el-step
          title="Resumen"
          description="Monitoreo y asignacion"
          icon="icono-arg-tramite icono-2x"/>
      </el-steps>
    </div>
    <div class="step-content">
      <el-form>
        <div
          v-if="active === 1"
          class="ipp-form-wrapper">
          <basic-data @next="(value) => moveTo(value)"/>
        </div>
        <div
          v-if="active === 2"
          class="ipp-form-wrapper">
          <victimizers @next="(value) => moveTo(value)"/>
        </div>
        <div
          v-if="active === 3"
          class="ipp-form-wrapper">
          <victims @next="(value) => moveTo(value)"/>
        </div>
        <div
          v-if="active === 4"
          class="ipp-form-wrapper">
          <police-station @next="(value) => moveTo(value)"/>
        </div>
        <div
          v-if="active === 5"
          class="ipp-form-wrapper">
          <ipp-source @next="(value) => moveTo(value)"/>
        </div>
        <div
          v-if="active === 6"
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
  data() {
    return {
      active: 1
    };
  },
  methods: {
    moveTo(value) {
      this.active = value;
    }
  }
};
</script>

<style>
.step-indicator {
  padding: 10px;
}

.ipp-form {
  padding: 20px;
  background: #fff;
  height: 100%;
}
.ipp-form-wrapper {
  position: relative;
  height: 100%;
}

.ipp-step-header {
  height: 2em;
  line-height: 2em;
  border-bottom: solid 1px #f1f1f1;
  border-top: solid 1px #f1f1f1;
  margin-bottom: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
}
</style>
