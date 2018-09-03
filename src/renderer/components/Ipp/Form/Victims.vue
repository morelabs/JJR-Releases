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
      Cargar Victimas
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
        <el-col :span="4">
          <el-form-item>
            <div :class="['el-input', newVictim.noDNI ? 'is-disabled' : '']">
              <the-mask
                v-model="newVictim.dni"
                :mask="['##.###.###', '#.###.###']"
                :disabled="newVictim.noDNI"
                suffix-icon="icono-arg-dni"
                name="dni"
                class="el-input__inner"
                style="width: 100%;"
                placeholder="DNI"/>
            </div>
            <div>
              <el-checkbox
                v-model="newVictim.noDNI"
                label="Sin DNI"
                @change="cleanField('dni')"/>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-input
              v-model="newVictim.first_name"
              name="name"
              style="width: 100%;"
              placeholder="Nombre"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-input
              v-model="newVictim.last_name"
              name="last_name"
              style="width: 100%;"
              placeholder="Apellido"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-radio-group v-model="newVictim.adult">
              <el-radio-button label="Adulto"/>
              <el-radio-button label="Menor"/>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item>
            <el-input
              v-model="newVictim.address"
              name="address"
              style="width: 100%;"
              placeholder="Direccion completa"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button
            :disabled="!dataValidated"
            style="width: 100%"
            @click="addVictim()">Agregar</el-button>
        </el-col>
      </el-row>
      <hr>
      <el-table
        :data="ipp.victims"
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
              @click="removeVictim(scope.row)"><i class="el-icon-delete"/>
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
      newVictim: {
        first_name: "",
        last_name: "",
        dni: "",
        adult: false,
        address: "",
        noAddress: false,
        noDNI: false
      },
      ipp: {
        victims: []
      }
    };
  },
  computed: {
    ...ippGetters(["ippFormVictims"]),
    valid() {
      return this.ipp.victims.length > 0;
    },
    dataValidated() {
      return this.newVictim.first_name && this.newVictim.last_name;
    }
  },
  created() {
    this.parseFromStorage();
  },
  methods: {
    ...ippActions(["setIppVictims"]),
    parseFromStorage() {
      extend(this.ipp, this.ippFormVictims);
    },
    goBack() {
      this.$emit("next", 2);
    },
    goNext() {
      if (this.valid) {
        this.setIppVictims(this.ipp);
        this.$emit("next", 4);
      }
    },
    cleanField(field) {
      this.newVictim[field] = "";
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    addVictim() {
      this.ipp.victims.push(clone(this.newVictim));
      this.newVictim = {
        name: "",
        dni: "",
        adult: false,
        address: "",
        noAddress: false,
        noDNI: false,
        dniValidated: false,
        addressValidated: false
      };
    },
    removeVictim(vict) {
      let index = this.ipp.victims.indexOf(vict);
      this.ipp.victims.splice(index, 1);
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
