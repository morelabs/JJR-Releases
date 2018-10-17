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
    <div class="ipp-step-inner">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item>
            <div :class="['el-input', newVictimizer.noDNI ? 'is-disabled' : '']">
              <the-mask
                v-model="newVictimizer.document_number"
                :mask="['##.###.###', '#.###.###']"
                :disabled="newVictimizer.noDNI"
                suffix-icon="icono-arg-dni"
                name="document_number"
                class="el-input__inner"
                style="width: 100%;"
                placeholder="DNI"/>
            </div>
            <div>
              <el-checkbox
                v-model="newVictimizer.noDNI"
                label="Sin DNI"
                @change="cleanField('document_number')"/>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button
            :disabled="newVictimizer.noDNI"
            style="width: 100%"
            @click="validateDNI()"><i class="el-icon-check"/></el-button>
        </el-col>
        <el-col :span="6">
          <el-form-item style="width: 100%;">
            <el-radio-group
              v-model="newVictimizer.gender"
              :disabled="!dniPresent"
              style="width: 100%;">
              <el-radio-button label="Fem"/>
              <el-radio-button label="Masc"/>
              <el-radio-button label="Otro"/>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item style="width: 100%;">
            <el-date-picker
              v-model="newVictimizer.birth_date"
              :clearable="true"
              :disabled="!dniPresent"
              :format="dateFormat"
              style="width: 100%;"
              name="birth_date"
              placeholder="Fecha de nacimiento"/>
            <div>
              <el-checkbox
                v-model="newVictimizer.adult"
                label="es menor?"
                @change="cleanField('birth_date')"/>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <el-input
              v-model="newVictimizer.firstname"
              :disabled="!dniPresent"
              name="name"
              style="width: 100%;"
              placeholder="Nombre"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input
              v-model="newVictimizer.lastname"
              :disabled="!dniPresent"
              name="last_name"
              style="width: 100%;"
              placeholder="Apellido"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item>
            <el-input
              v-model="newVictimizer.address"
              :disabled="newVictimizer.noAddress || !dniPresent"
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
        <el-col :span="2">
          <el-button
            :disabled="newVictimizer.noAddress"
            style="width: 100%"
            @click="validateAddress()"><i class="el-icon-check"></i></el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            :disabled="!dataValidated"
            style="width: 100%"
            @click="addVictimizer()"><i class="el-icon-plus"></i></el-button>
        </el-col>
      </el-row>
      <hr>
      <el-table
        :data="ippFormVictimizers"
        style="width: 100%">
        <el-table-column width="70">
          <template slot-scope="scope">
            <i class="icono-arg-arma-portacion"></i>
          </template>
        </el-table-column>
        <el-table-column label="Nombre">
          <template slot-scope="scope">
            {{ scope.row.firstname }} {{ scope.row.lastname }}
          </template>
        </el-table-column>
        <el-table-column label="DNI">
          <template slot-scope="scope">
            {{ scope.row.document_number || "--------" }}
          </template>
        </el-table-column>
        <el-table-column label="Direccion">
          <template slot-scope="scope">
            {{ scope.row.address || "--------" }}
          </template>
        </el-table-column>
        <el-table-column label="Genero">
          <template slot-scope="scope">
            {{ scope.row.gender === "F" ? "Femenino" : "Masculino" }}
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
      dniError: "",
      dateFormat: "dddd dd, MMMM yyyy",
      newVictimizer: {
        id: "",
        firstname: "",
        lastname: "",
        document_number: "",
        birth_date: "",
        gender: "",
        address: "",
        role: "victimizer",
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
      return this.ippFormVictimizers.length > 0;
    },
    dataValidated() {
      let hasName =
        this.newVictimizer.firstname.trim() !== "" &&
        this.newVictimizer.lastname.trim() !== "";
      let dniValid =
        this.newVictimizer.noDNI || this.newVictimizer.dniValidated;
      let addressValid =
        this.newVictimizer.noAddress || this.newVictimizer.addressValidated;

      return hasName && dniValid && addressValid;
    },
    dniPresent() {
      return (
        (this.newVictimizer.document_number &&
          this.newVictimizer.dniValidated) ||
        this.newVictimizer.noDNI
      );
    }
  },
  methods: {
    ...ippActions([
      "setIppVictimizers",
      "checkDNI",
      "addPerson",
      "removePerson"
    ]),
    goBack() {
      this.$emit("next", 1);
    },
    goNext() {
      if (this.valid) {
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
      if (this.isValidFormat() && this.isNotSelected()) {
        this.checkDNI({ dni: this.newVictimizer.document_number })
          .then(response => {
            extend(this.newVictimizer, response.person);
            this.addVictimizer();
          })
          .catch(error => {
            console.log(error);
            this.newVictimizer.dniValidated = true;
          });
      } else {
        this.$message({
          type: "error",
          message: this.dniError
        });
      }
    },
    validateAddress() {
      this.newVictimizer.addressValidated = true;
    },
    addVictimizer() {
      this.addPerson({ person: this.newVictimizer, role: "victimizers" })
        .then(response => {
          let vict = clone(this.newVictimizer);
          this.$message({
            type: "success",
            message: `Se agrego a ${vict.firstname} ${vict.lastname}`
          });
          this.resetForm();
        })
        .catch(error => {
          console.log(error);
        });
    },
    removeVictimizer(vict) {
      this.removePerson({ personId: vict.id, role: "victimizers" }).then(() => {
        console.log("Victimario removido");
      });
    },
    isNotSelected() {
      let p = this.ippFormVictimizers.find(
        v => v.document_number == this.newVictimizer.document_number
      );
      if (p) {
        console.log("No p");
        this.dniError = "El dni ingresado ya esta seleccionado";
        return false;
      }
      return true;
    },
    isValidFormat() {
      if (!this.newVictimizer.document_number) {
        this.dniError = "No hay DNI";
        return false;
      }
      let leng = this.newVictimizer.document_number.length;
      if (leng < 7) {
        this.dniError = "El formato es invalido";
        return false;
      }
      return true;
    },
    resetForm() {
      this.newVictimizer = {
        id: "",
        firstname: "",
        lastname: "",
        document_number: "",
        gender: "",
        address: "",
        addressNumber: "",
        role: "victimizer",
        noAddress: false,
        noDNI: false,
        dniValidated: false,
        addressValidated: false
      };
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
