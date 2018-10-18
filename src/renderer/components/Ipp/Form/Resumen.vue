<template>
  <div
    v-loading="loading"
    class="ipp-form-container">
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
        style="float: right"
        @click="saveIpp()">
        Guardar
        <fw-icon icon="save"/>
      </el-button>
    </div>
    <div
      v-if="!loading"
      class="ipp-step-inner ipp-content-resumen">
      <h3>Informacion Basica</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="label">Numero</div>
          <div class="value">{{ ippForm.base.ipp_number }}</div>
        </el-col>
        <el-col :span="8">
          <div class="label">Fecha del hecho</div>
          <div class="value">
            <span v-if="ippForm.base.commited_at">{{ ippForm.base.commited_at | moment("dddd DD [de] MMMM, YYYY") }}</span>
            <span
              v-else
              class="no-data">Sin fecha</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="label">Fecha de la denuncia</div>
          <div class="value">
            <span v-if="ippForm.base.reported_at">{{ ippForm.base.reported_at | moment("dddd DD [de] MMMM, YYYY") }}</span>
            <span
              v-else
              class="no-data">Sin fecha</span>
          </div>
        </el-col>
      </el-row>
      <hr>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="label">Origen</div>
          <div :class="['value', ippForm.base.origin_id ? '' : 'no-data']">{{ ippForm.base.origin.name || 'No especificado' }}</div>
        </el-col>
        <el-col :span="8">
          <div class="label">Estado</div>
          <div :class="['value', ippForm.base.case_state_id ? '' : 'no-data']">{{ ippForm.base.case_state.name || 'Sin datos' }}</div>
        </el-col>
        <el-col :span="8">
          <div class="label">Comisaria</div>
          <div class="value">
            {{ ippForm.policeStation.police_station.name || 'Sin datos' }}
          </div>
        </el-col>
      </el-row>
      <hr>
      <h3>Delitos</h3>
      <el-row
        v-for="(crime, index) in ippForm.policeStation.crimes"
        :key="`offense-${index}`"
        :gutter="20">
        <el-col :span="24">
          {{ crime.name }} <div style="float: right; color: red;">{{ crime.type }}</div>
        </el-col>
      </el-row>
      <hr>
      <h3>Victimarios</h3>
      <el-row
        v-for="(victimizer, index) in ippForm.victimizers"
        :key="`victimizer-${index}`"
        :gutter="20">
        <el-col :span="8">
          {{ victimizer.firstname }} {{ victimizer.lastname }}
        </el-col>
        <el-col :span="4">
          {{ victimizer.document_number || 'Sin DNI' }}
        </el-col>
        <el-col :span="4">
          {{ victimizer.gender }}
        </el-col>
        <el-col :span="8">
          {{ victimizer.address || 'Sin direccion' }}
        </el-col>
      </el-row>
      <hr>
      <h3>Victimas</h3>
      <el-row
        v-for="(victim, index) in ippForm.victims"
        :key="`victim-${index}`"
        :gutter="20">
        <el-col :span="8">
          {{ victim.firstname }} {{ victim.lastname }}
        </el-col>
        <el-col :span="4">
          {{ victim.document_number || 'Sin DNI' }}
        </el-col>
        <el-col :span="4">
          {{ victim.gender }}
        </el-col>
        <el-col :span="8">
          {{ victim.address || 'Sin direccion' }}
        </el-col>
      </el-row>
      <hr>
      <el-row :gutter="20">
        <el-col :span="12">
          <h3>Observaciones</h3>
          <el-row
            v-for="(note, index) in ippForm.source.observations"
            :key="`note-${index}`"
            :gutter="20">
            <el-col :span="24">
              <p>{{ note }}</p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <h3>Definicion</h3>
          <span style="color: red"><b>{{ ippForm.source.definition }}</b></span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: ippGetters, mapActions: ippActions } = namespace("ipp");

export default {
  name: "IppResumen",
  directives: { mask },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...ippGetters(["ippForm"])
  },
  methods: {
    ...ippActions(["addIpp", "resetIpp"]),
    saveIpp() {
      this.loading = true;
      let payload = this.parseData();
      this.addIpp({ ipp: payload })
        .then(response => {
          this.$router.push({
            name: "ipp",
            params: { id: response.ipp_case.id }
          });
          this.resetIpp();
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    parseData() {
      return {
        ipp_number: this.ippForm.base.ipp_number,
        event_address: this.ippForm.base.event_address,
        event_date: this.ippForm.base.event_date,
        event_hour: this.ippForm.base.event_hour,
        police_station_id: this.ippForm.policeStation.police_station.id,
        definition: this.ippForm.source.definition,
        case_state_id: this.ippForm.base.case_state.id,
        origin_id: this.ippForm.base.origin.id,
        ipp_case_crimes_attributes: this.ippForm.policeStation.crimes.map(c => {
          return { crime_id: c.id, crime_status: c.type };
        }),
        subjects_attributes: this.setSubjects()
      };
    },
    goBack() {
      this.$emit("next", 4);
    },
    setSubjects() {
      let list = [];
      _.map(this.ippForm.victimizers, c =>
        list.push({ person_id: c.id, role: "victimizer" })
      );
      _.map(this.ippForm.victims, c =>
        list.push({ person_id: c.id, role: "victim" })
      );
      return list;
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
.no-data {
  color: #ccc;
}
</style>
