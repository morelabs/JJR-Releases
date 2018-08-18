<template>
  <div class="ipp-form-wrapper">
    <div class="ipp-form-container">
      <div class="ipp-step-header">
        <el-button
          type="primary"
          style="float: left"
          @click="goBack()">
          <fw-icon icon="chevron-left"/>
          Volver
        </el-button>
        Cargar Victimarios
        <el-button
          :disabled="!valid"
          type="primary"
          style="float: right"
          @click="goNext()">
          Siguiente
          <fw-icon icon="chevron-right"/>
        </el-button>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item>
              <el-input
                v-model="newVictimizer.dni"
                :disabled="newVictimizer.noDNI"
                suffix-icon="icono-arg-dni"
                name="dni"
                style="width: 100%;"
                placeholder="DNI: XX.XXX.XXX"
                @change="validateDNI"/>
              <div>
                <el-checkbox
                  v-model="newVictimizer.noDNI"
                  label="Sin DNI"
                  @change="cleanField('dni')"/>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-input
                v-model="newVictimizer.first_name"
                name="name"
                style="width: 100%;"
                placeholder="Nombre"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-input
                v-model="newVictimizer.last_name"
                name="last_name"
                style="width: 100%;"
                placeholder="Apellido"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-radio-group v-model="newVictimizer.adult">
                <el-radio-button label="Adulto"/>
                <el-radio-button label="Menor"/>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item>
              <el-input
                v-model="newVictimizer.address"
                :disabled="newVictimizer.noAddress"
                name="address"
                style="width: 100%;"
                placeholder="Direccion completa"/>
              <div>
                <el-checkbox
                  v-model="newVictimizer.noAddress"
                  label="Direccion desconocida"
                  @change="cleanField('address')"/>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-input
                v-model="newVictimizer.addressNumber"
                :disabled="newVictimizer.noAddress"
                name="addressNumber"
                style="width: 100%;"
                placeholder="Altura"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              :disabled="newVictimizer.noAddress"
              style="width: 100%">Validar</el-button>
          </el-col>
          <el-col :span="4">
            <el-button
              :disabled="!dataValidated"
              style="width: 100%"
              @click="addVictimizer()">Agregar</el-button>
          </el-col>
        </el-row>
        <hr>
      </div>
      <el-table
        :data="ipp.victimizers"
        style="width: 100%">
        <el-table-column width="70">
          <template slot-scope="scope">
            <i class="icono-arg-arma-portacion"></i>
          </template>
        </el-table-column>
        <el-table-column label="Nombre">
          <template slot-scope="scope">
            {{ scope.row.first_name }} {{ scope.row.last_name }}
          </template>
        </el-table-column>
        <el-table-column label="DNI">
          <template slot-scope="scope">
            {{ scope.row.dni || "--------" }}
          </template>
        </el-table-column>
        <el-table-column label="Direccion">
          <template slot-scope="scope">
            {{ scope.row.address || "--------" }}
          </template>
        </el-table-column>
        <el-table-column label="Edad">
          <template slot-scope="scope">
            {{ scope.row.adult === "Adulto" ? "Adulto (+18)" : "Menor (-18)" }}
          </template>
        </el-table-column>
        <el-table-column width="70">
          <template slot-scope="scope">
            <a
              href="#"
              @click="removeVictimizer(scope.row)"><i class="el-icon-delete"/>
            </a>
          </template>
        </el-table-column>
      </el-table>
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
      showForm: false,
      newVictimizer: {
        first_name: "",
        last_name: "",
        dni: "",
        adult: "",
        address: "",
        addressNumber: "",
        noAddress: false,
        noDNI: false,
        dniValidated: false,
        addressValidated: false
      },
      ipp: {
        victimizers: []
      }
    };
  },
  computed: {
    ...ippGetters(["ippFormVictimizers"]),
    valid() {
      return this.ipp.victimizers.length > 0;
    },
    dataValidated() {
      let hasName =
        this.newVictimizer.first_name && this.newVictimizer.last_name;
      let dniValid = this.newVictimizer.noDNI
        ? true
        : this.newVictimizer.dniValidated;
      let addressValid = this.newVictimizer.noAddress
        ? true
        : this.newVictimizer.addressValidated;
      return hasName && dniValid && addressValid;
    }
  },
  created() {
    this.parseFromStorage();
  },
  methods: {
    ...ippActions(["setIppVictimizers", "checkDNI"]),
    parseFromStorage() {
      extend(this.ipp, this.ippFormVictimizers);
    },
    goBack() {
      this.$emit("next", 1);
    },
    goNext() {
      if (this.valid) {
        this.setIppVictimizers(this.ipp);
        this.$emit("next", 3);
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    cleanField(field) {
      this.newVictimizer[field] = "";
    },
    validateDNI() {
      if (this.newVictimizer.dni && this.newVictimizer.dni.length == 8) {
        console.log("Vamos a validar la persona");
      } else {
        console.log("El DNI no es valido");
      }
    },
    addVictimizer() {
      this.ipp.victimizers.push(clone(this.newVictimizer));
      this.newVictimizer = {
        name: "",
        dni: "",
        adult: "",
        address: "",
        noAddress: false,
        noDNI: false,
        dniValidated: false,
        addressValidated: false
      };
    },
    removeVictimizer(vict) {
      let index = this.ipp.victimizers.indexOf(vict);
      this.ipp.victimizers.splice(index, 1);
    }
  }
};
</script>

<style>
ul.victimizer-list {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
.victimizer-row {
  height: 3em;
  line-height: 2.5em;
}
.victimizer-row .muted {
  color: #999999;
}
.pull-right {
  float: right;
}
</style>
