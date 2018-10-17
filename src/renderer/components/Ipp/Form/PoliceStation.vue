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
                v-for="item in data.crimes"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
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
                v-for="(item, index) in data.crime_status"
                :key="index"
                :label="item"
                :value="item"/>
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
        :data="ippFormPoliceStation.crimes"
        style="width: 100%">
        <el-table-column width="70">
          <template slot-scope="scope">
            <i class="icono-arg-conexion"></i>
          </template>
        </el-table-column>
        <el-table-column label="Delito">
          <template slot-scope="scope">
            {{ scope.row.name }}
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
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <el-select
              v-model="newPoliceStation.id"
              clearable
              filterable
              placeholder="Seleccionar Comisaria"
              style="width: 100%;"
              @change="setPoliceStation">
              <el-option
                v-for="(item, index) in data.police_stations"
                :key="index"
                :label="item.name"
                :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.city_name }}</span>
              </el-option>
            </el-select>
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
      newOffense: {
        id: "",
        name: "",
        type: ""
      },
      newPoliceStation: {
        id: ""
      }
    };
  },
  computed: {
    ...ippGetters(["ippFormPoliceStation", "data"]),
    valid() {
      return (
        this.ippFormPoliceStation.crimes.length > 0 &&
        this.ippFormPoliceStation.police_station.id
      );
    }
  },
  created() {
    extend(this.newPoliceStation, this.ippFormPoliceStation.police_station);
  },
  methods: {
    ...ippActions([
      "setIppPolice",
      "addPoliceStation",
      "removePoliceStation",
      "addCrime",
      "removeCrime"
    ]),
    goBack() {
      this.$emit("next", 3);
    },
    goNext() {
      if (this.valid) {
        this.$emit("next", 5);
      }
    },
    setPoliceStation(val) {
      if (val.toString().trim()) {
        let ps = this.data.police_stations.find(p => p.id === val);
        this.addPoliceStation({ police_station: ps });
      } else {
        this.removePoliceStation({ policeStationId: val });
      }
    },
    addOffense(val) {
      let crime = this.data.crimes.find(s => this.newOffense.id === s.id);
      extend(crime, { type: this.newOffense.type });
      this.addCrime({ crime });
      this.resetCrime();
    },
    removeOffense(crime) {
      this.removeCrime({ crimeId: crime.id });
    },
    resetCrime() {
      this.newOffense = {
        id: "",
        name: "",
        type: ""
      };
    }
  }
};
</script>
