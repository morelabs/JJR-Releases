<template>
  <div class="ipp-form-container">
    <div class="ipp-step-header">
      Informacion Inicial
      <el-button
        :disabled="!valid"
        type="primary"
        style="float: right"
        @click="goNext()">
        Siguiente
        <fw-icon icon="chevron-right"/>
      </el-button>
    </div>
    <div class="ipp-step-inner">
      <h3>Origen</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <el-select
              v-model="ipp.origin_id"
              clearable
              filterable
              placeholder="Seleccionar origen"
              style="width: 100%;"
              @change="setOrigin">
              <el-option
                v-for="item in data.origins"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.city }}</span>
              </el-option>  
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <div class="el-input">
              <the-mask
                :mask="'##-##-####-##'"
                v-model="ipp.ipp_number"
                name="number"
                type="tel"
                class="el-input__inner"
                style="width: 100%;"
                placeholder="Numero de IPP"/>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <h3>Datos del hecho</h3>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item>
            <el-input
              v-model="ipp.event_address"
              name="address"
              style="width: 100%;"
              placeholder="Direccion del hecho  "/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <el-date-picker
              v-model="ipp.event_date"
              :clearable="true"
              :disabled="ipp.eventDateDisabled"
              :format="dateFormat"
              style="width: 67.5%;"
              name="event_date"
              placeholder="Fecha del hecho"/>
            <el-time-select
              v-model="ipp.event_hour"
              :clearable="true"
              :disabled="ipp.eventDateDisabled"
              :picker-options="pickerOptions"
              style="width: 27.5%; float: right;"
              name="event_hour"
              placeholder="Hora del hecho"/>
            <div>
              <el-checkbox
                v-model="ipp.eventDateDisabled"
                label="Fecha desconocida"
                @change="cleanDate('event')"/>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-date-picker
              v-model="ipp.report_date"
              :clearable="true"
              :disabled="ipp.reportDateDisabled"
              :format="dateFormat"
              :picker-options="pickerReportOptions"
              style="width: 100%;"
              name="report_date"
              placeholder="Fecha de la denuncia"/>
            <div>
              <el-checkbox
                v-model="ipp.reportDateDisabled"
                label="Fecha desconocida"
                @change="cleanDate('report')"/>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <h3>Estado</h3>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item>
            <el-select
              v-model="ipp.case_state_id"
              clearable
              filterable
              placeholder="Seleccionar estado"
              style="width: 100%;"
              @change="setCase">
              <el-option
                v-for="item in data.case_states"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { extend } from "lodash";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: ippGetters, mapActions: ippActions } = namespace("ipp");

export default {
  name: "BasicData",
  data() {
    return {
      dateFormat: "dddd dd, MMMM yyyy",
      pickerOptions: {
        start: "08:30",
        step: "00:15",
        end: "18:30"
      },
      pickerReportOptions: {
        disabledDate: time => {
          return time.getTime() < this.ipp.event_date.getTime();
        }
      },
      ipp: {
        ipp_number: "",
        event_date: "",
        event_hour: "",
        report_date: "",
        eventDateDisabled: false,
        reportDateDisabled: false,
        origin_id: "",
        origin: {},
        case_state_id: "",
        case_state: {}
      },
      allSources: [
        { id: 1, name: "Fiscalia 1", city: "San Isidro" },
        { id: 2, name: "Fiscalia 2", city: "San Isidro" },
        { id: 3, name: "Fiscalia 3", city: "San Isidro" },
        { id: 4, name: "Fiscalia 4", city: "San Isidro" },
        { id: 5, name: "Fiscalia 5", city: "San Isidro" }
      ],
      allStates: [
        { id: 1, name: "En curso" },
        { id: 2, name: "Probation" },
        { id: 3, name: "Alegatos" }
      ]
    };
  },
  computed: {
    ...ippGetters(["ippFormBase", "data"]),
    valid() {
      return (
        this.ipp.ipp_number && this.ipp.origin_id && this.ipp.case_state_id
      );
    }
  },
  created() {
    this.parseFromStorage();
  },
  methods: {
    ...ippActions(["setIppBase"]),
    parseFromStorage() {
      extend(this.ipp, this.ippFormBase);
    },
    goNext() {
      if (this.valid) {
        this.setIppBase(this.ipp);
        this.$emit("next", 2);
      }
    },
    cleanDate(field) {
      if (field == "report") {
        this.ipp.report_date = "";
      } else if (field == "event") {
        this.ipp.event_date = "";
        this.ipp.event_hour = "";
      }
    },
    setOrigin(val) {
      this.ipp.origin = this.data.origins.find(s => val === s.id);
    },
    setCase(val) {
      this.ipp.case_state = this.data.case_states.find(s => val === s.id);
    },
    minDateSet() {
      return this.event_date <= this.report_date;
    }
  }
};
</script>
