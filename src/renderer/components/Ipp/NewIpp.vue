<template>
  <div>
    <h1>Nuevo Ipp</h1>
    <div style="background: #fff; padding: 40px;">
      <div class="step-indicator">
        <el-steps
          :active="active"
          align-center>
          <el-step
            title="Inicio"
            description="Informacion Basica"
            icon="icono-arg-firma-contrato icono-2x"/>
          <el-step
            title="Involucrados"
            description="Victimas y victimarios"
            icon="icono-arg-comunidad icono-2x"/>
          <el-step
            title="Comsiaria"
            description="Datos de la comisaria"
            icon="icono-arg-seguridad icono-2x"/>
          <el-step
            title="Origen"
            description="Monitoreo y asignacion"
            icon="icono-arg-justicia icono-2x"/>
        </el-steps>
      </div>
      <div class="step-content">
        <el-form label-width="200px">
          <div v-if="active === 1">
            <basic-data @next="(value) => moveTo(value)"/>
          </div>
          <div v-if="active === 2">
            <people-involved @next="(value) => moveTo(value)"/>
          </div>
          <div v-if="active === 3">
            <police-station @next="(value) => moveTo(value)"/>
          </div>
          <div v-if="active === 4">
            <ipp-source @next="(value) => moveTo(value)"/>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import BasicData from "./Form/BasicData";
import PeopleInvolved from "./Form/PeopleInvolved";
import PoliceStation from "./Form/PoliceStation";
import IppSource from "./Form/Source";
export default {
  name: "NewIpp",
  components: { BasicData, PeopleInvolved, PoliceStation, IppSource },
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

<style scoped>
.step-indicator {
  margin-bottom: 20px;
}
.step-content {
  margin-top: 50px;
}
</style>
