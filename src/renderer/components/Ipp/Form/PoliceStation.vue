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
      Cargar Hechos
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
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <el-select
              v-model="newOffense.id"
              clearable
              filterable
              placeholder="Seleccionar delito"
              style="width: 100%;">
              <el-option
                v-for="item in allOffenses"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-select
              v-model="newOffense.type"
              clearable
              filterable
              placeholder="Seleccionr grado"
              style="width: 100%;">
              <el-option
                v-for="item in allOffenseTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button
              :disabled="!newOffense.type || !newOffense.id"
              style="width: 100%;"
              @click="addOffense()">Agregar</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table
        :data="ipp.offenses"
        style="width: 100%">
        <el-table-column width="70">
          <template slot-scope="scope">
            <i class="icono-arg-conexion"></i>
          </template>
        </el-table-column>
        <el-table-column label="Delito">
          <template slot-scope="scope">
            {{ offenseName(scope.row.id) }}
          </template>
        </el-table-column>
        <el-table-column label="Grado">
          <template slot-scope="scope">
            {{ scope.row.type || "--------" }}
          </template>
        </el-table-column>
        <el-table-column width="70">
          <template slot-scope="scope">
            <a
              href="#"
              @click="removeOffense(scope.row)"><i class="el-icon-delete"/>
            </a>
          </template>
        </el-table-column>
      </el-table>
      <h3 style="margin-top: 50px;">Comisaria</h3>
      <el-form-item>
        <el-select
          v-model="ipp.policeStation.id"
          clearable
          filterable
          placeholder="Seleccionar Comisaria"
          style="width: 100%;"
          @change="setPoliceStation">
          <el-option
            v-for="(item, index) in allPoliceStations"
            :key="index"
            :label="item.name"
            :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.neighborhood }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-row
        v-if="ipp.policeStation.id"
        :gutter="20">
        <el-col :span="8">
          <el-form-item label="Barrio">
            <el-input
              v-model="ipp.policeStation.neighborhood"
              readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Localidad">
            <el-input
              v-model="ipp.policeStation.city"
              readonly/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Provincia">
            <el-input
              v-model="ipp.policeStation.state"
              readonly/>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { extend, clone, remove } from "lodash";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: ippGetters, mapActions: ippActions } = namespace("ipp");

export default {
  name: "PeopleInvolved",
  data() {
    return {
      newOffense: { id: "", type: "" },
      allOffenses: [
        { value: 1, label: "Robo a mano armada" },
        { value: 2, label: "Hurto" },
        { value: 3, label: "Secuestro" }
      ],
      allOffenseTypes: [
        { value: "tentativa", label: "Tentativa" },
        { value: "cosumado", label: "Consumado" }
      ],
      allPoliceStations: [
        {
          id: 1,
          name: "Comisaria 3ra.",
          neighborhood: "Las Lomas",
          city: "San Isidro",
          state: "Buenos Aires"
        },
        {
          id: 2,
          name: "Comisaria 1ra.",
          neighborhood: "Beccar alto",
          city: "San Isidro",
          state: "Buenos Aires"
        },
        {
          id: 3,
          name: "Comisaria 11ra.",
          neighborhood: "Bajo San Isidro",
          city: "San Isidro",
          state: "Buenos Aires"
        },
        {
          id: 4,
          name: "Comisaria 12ra.",
          neighborhood: "San Isidro Centro",
          city: "San Isidro",
          state: "Buenos Aires"
        },
        {
          id: 5,
          name: "Comisaria de la mujer",
          neighborhood: "Bajo San Isidro",
          city: "San Isidro",
          state: "Buenos Aires"
        }
      ],
      ipp: {
        offenses: [],
        policeStation: {
          id: "",
          name: "",
          city: "",
          neighborhood: "",
          state: ""
        }
      }
    };
  },
  computed: {
    ...ippGetters(["ippFormPoliceStation"]),
    valid() {
      return this.ipp.offenses.length > 0 && this.ipp.policeStation.id;
    }
  },
  created() {
    this.parseFromStorage();
  },
  methods: {
    ...ippActions(["setIppPolice"]),
    parseFromStorage() {
      extend(this.ipp, this.ippFormPoliceStation);
    },
    goBack() {
      this.$emit("next", 3);
    },
    goNext() {
      if (this.valid) {
        console.log("IPP", this.ipp);
        this.setIppPolice(this.ipp);
        this.$emit("next", 5);
      }
    },
    setPoliceStation(val) {
      console.log("Val", val);
      if (val.toString().trim()) {
        this.ipp.policeStation = this.allPoliceStations.find(p => p.id === val);
      } else {
        this.ipp.policeStation = {
          id: "",
          name: "",
          city: "",
          neighborhood: "",
          state: ""
        };
      }
    },
    addOffense() {
      this.ipp.offenses.push(clone(this.newOffense));
    },
    removeOffense(offense) {
      let index = this.ipp.offenses.indexOf(offense);
      this.ipp.offenses.splice(index, 1);
    },
    offenseName(id) {
      console.log("ID", id);
      return this.allOffenses.find(o => o.value === id).label;
    }
  }
};
</script>
