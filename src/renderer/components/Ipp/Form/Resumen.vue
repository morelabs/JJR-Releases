<template>
  <div class="ipp-form-container">
    <div class="ipp-step-header">
      <el-button
        type="primary"
        style="float: left"
        @click="goBack()">
        <fw-icon icon="chevron-left"/>
        Volver
      </el-button>
      Revision
      <el-button
        type="danger"
        style="float: right">
        Guardar
        <fw-icon icon="save"/>
      </el-button>
    </div>
    <div class="ipp-step-inner ipp-content-resumen">
      <h3>Informacion Basica</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="label">Numero</div>
          <div class="value">{{ ippForm.base.number }}</div>
        </el-col>
        <el-col :span="8">
          <div class="label">Fecha del hecho</div>
          <div class="value">
            <span v-if="ippForm.base.commited_at">{{ ippForm.base.commited_at | moment("dddd DD [de] MMMM, YYYY") }}</span>
            <span v-else>Sin fecha</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="label">Fecha de la denuncia</div>
          <div class="value">
            <span v-if="ippForm.base.reported_at">{{ ippForm.base.reported_at | moment("dddd DD [de] MMMM, YYYY") }}</span>
            <span v-else>Sin fecha</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="label">Origen</div>
          <div class="value">{{ ippForm.base.source.name || 'No especificado' }}</div>
        </el-col>
        <el-col :span="8">
          <div class="label">Estado</div>
          <div class="value">{{ ippForm.base.state || 'Sin datos' }}</div>
        </el-col>
        <el-col :span="8">
          <div class="label">Comisaria</div>
          <div class="value">
            {{ ippForm.policeStation.policeStation.name || 'Sin datos' }}
            <div>
              <small style="color: #999">
                {{ ippForm.policeStation.policeStation.neighborhood }},
                {{ ippForm.policeStation.policeStation.city }},
                {{ ippForm.policeStation.policeStation.state }}
              </small>
            </div>
          </div>
        </el-col>
      </el-row>
      <hr>
      <h3>Delitos</h3>
      <el-row
        v-for="(offense, index) in ippForm.policeStation.offenses"
        :key="index"
        :gutter="20">
        <el-col :span="24">
          {{ offense.name }} {{ offense.type }}
        </el-col>
      </el-row>
      <hr>
      <h3>Victimarios</h3>
      <el-row
        v-for="(victimizer, index) in ippForm.victimizers.victimizers"
        :key="index"
        :gutter="20">
        <el-col :span="8">
          {{ victimizer.first_name }} {{ victimizer.last_name }}
        </el-col>
        <el-col :span="4">
          {{ victimizer.dni || 'Sin DNI' }}
        </el-col>
        <el-col :span="4">
          {{ victimizer.adult }}
        </el-col>
        <el-col :span="8">
          {{ victimizer.address || 'Sin direccion' }}
        </el-col>
      </el-row>
      <hr>
      <h3>Victimas</h3>
      <el-row
        v-for="(victim, index) in ippForm.victims.victims"
        :key="index"
        :gutter="20">
        <el-col :span="8">
          {{ victim.first_name }} {{ victim.last_name }}
        </el-col>
        <el-col :span="4">
          {{ victim.dni || 'Sin DNI' }}
        </el-col>
        <el-col :span="4">
          {{ victim.adult }}
        </el-col>
        <el-col :span="8">
          {{ victim.address || 'Sin direccion' }}
        </el-col>
      </el-row>
      <hr>
      <h3>Observaciones</h3>
      <el-row
        v-for="(note, index) in ippForm.source.notes"
        :key="index"
        :gutter="20">
        <el-col :span="24">
          {{ note.name }}
        </el-col>
      </el-row>
      <hr>
      <h3>Asignados</h3>
      <el-row
        v-for="(user, index) in ippForm.source.assignees"
        :key="index"
        :gutter="20">
        <el-col :span="20">
          {{ user.name }}
        </el-col>
        <el-col :span="4">
          {{ user.role }}
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: ippGetters, mapActions: ippActions } = namespace("ipp");

export default {
  name: "IppResumen",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...ippGetters(["ippForm"])
  },
  methods: {
    saveIpp() {
      let payload = this.parseData();
      console.log("Save ipp", payload);
    },
    parseData() {
      console.log(this.ippForm);
    },
    goBack() {
      this.$emit("next", 5);
    }
  }
};
</script>

<style>
.ipp-content-resumen .label {
  font-weight: bold;
  color: #235e59;
}
.ipp-content-resumen .value {
  margin: 10px 0px;
}
</style>
