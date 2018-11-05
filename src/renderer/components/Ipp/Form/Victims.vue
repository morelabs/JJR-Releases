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
      Cargar Víctimas
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
            <div :class="['el-input', newVictim.noDNI ? 'is-disabled' : '']">
              <the-mask
                v-model="newVictim.document_number"
                :mask="['##.###.###', '#.###.###']"
                :disabled="newVictim.noDNI"
                suffix-icon="icono-arg-dni"
                name="document_number"
                class="el-input__inner"
                style="width: 100%;"
                placeholder="DNI"/>
            </div>
            <div>
              <el-checkbox
                v-model="newVictim.noDNI"
                label="Sin DNI"
                @change="cleanField('document_number')"/>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button
            :disabled="newVictim.noDNI"
            style="width: 100%"
            @click="validateDNI()"><i class="el-icon-check"/></el-button>
        </el-col>
        <el-col :span="6">
          <el-form-item style="width: 100%;">
            <el-radio-group
              v-model="newVictim.gender"
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
              v-model="newVictim.birth_date"
              :clearable="true"
              :disabled="!dniPresent"
              :format="dateFormat"
              style="width: 100%;"
              name="birth_date"
              placeholder="Fecha de nacimiento"
              @change="checkMinor()"/>
            <div>
              <el-switch
                v-model="newVictim.minor"
                active-text="Menor"
                inactive-text="Adulto"
                @change="checkMinor()"/>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <el-input
              v-model="newVictim.firstname"
              :disabled="!dniPresent"
              name="name"
              style="width: 100%;"
              placeholder="Nombre"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-input
              v-model="newVictim.lastname"
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
              v-model="newVictim.address"
              :disabled="newVictim.noAddress || !dniPresent"
              name="address"
              style="width: 100%;"
              placeholder="Direccion completa"/>
            <div>
              <el-checkbox
                v-model="newVictim.noAddress"
                label="Direccion desconocida"
                @change="cleanField('address')"/>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button
            :disabled="newVictim.noAddress"
            style="width: 100%"
            @click="validateAddress()"><i class="el-icon-check"></i></el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            :disabled="!dataValidated"
            style="width: 100%"
            @click="addVictim()"><i class="el-icon-plus"></i></el-button>
        </el-col>
      </el-row>
      <hr>
      <el-table
        :data="ippFormVictims"
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
      dniError: "",
      dateFormat: "dddd dd, MMMM yyyy",
      newVictim: {
        id: "",
        firstname: "",
        lastname: "",
        document_number: "",
        birth_date: "",
        gender: "",
        address: "",
        role: "victim",
        noAddress: false,
        noDNI: false,
        dniValidated: false,
        addressValidated: false,
        minor: null
      }
    };
  },
  computed: {
    ...ippGetters(["ippFormVictims"]),
    valid() {
      return this.ippFormVictims.length > 0;
    },
    dataValidated() {
      let hasName =
        this.newVictim.firstname.trim() !== "" &&
        this.newVictim.lastname.trim() !== "";
      let dniValid = this.newVictim.noDNI || this.newVictim.dniValidated;
      let addressValid =
        this.newVictim.noAddress || this.newVictim.addressValidated;

      return hasName && dniValid && addressValid;
    },
    dniPresent() {
      return (
        (this.newVictim.document_number && this.newVictim.dniValidated) ||
        this.newVictim.noDNI
      );
    }
  },
  methods: {
    ...ippActions(["setIppVictims", "checkDNI", "addPerson", "removePerson"]),
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
      this.newVictim[field] = "";
    },
    validateDNI() {
      if (this.isValidFormat() && this.isNotSelected()) {
        this.checkDNI({ dni: this.newVictim.document_number })
          .then(response => {
            extend(this.newVictim, response.person);
            this.addVictim();
          })
          .catch(error => {
            console.log(error);
            this.newVictim.dniValidated = true;
          });
      } else {
        this.$message({
          type: "error",
          message: this.dniError
        });
      }
    },
    validateAddress() {
      this.newVictim.addressValidated = true;
    },
    checkMinor() {
      if (
        (this.newVictim.birth_date != null) &
        (this.newVictim.birth_date != "")
      ) {
        this.newVictim.minor = this.getAge(this.newVictim.birth_date) < 18;
      }
    },
    addVictim() {
      this.addPerson({
        person: this.newVictim,
        role: "victims",
        minor: this.newVictim.minor
      })
        .then(response => {
          let vict = clone(this.newVictim);
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
    removeVictim(vict) {
      this.removePerson({ personId: vict.id, role: "victims" }).then(() => {
        console.log("Victima removido");
      });
    },
    isNotSelected() {
      let p = this.ippFormVictims.find(
        v => v.document_number == this.newVictim.document_number
      );
      if (p) {
        console.log("No p");
        this.dniError = "El dni ingresado ya esta seleccionado";
        return false;
      }
      return true;
    },
    isValidFormat() {
      if (!this.newVictim.document_number) {
        this.dniError = "No hay DNI";
        return false;
      }
      let leng = this.newVictim.document_number.length;
      if (leng < 7) {
        this.dniError = "El formato es invalido";
        return false;
      }
      return true;
    },
    resetForm() {
      this.newVictim = {
        id: "",
        firstname: "",
        lastname: "",
        document_number: "",
        gender: "",
        address: "",
        role: "victim",
        noAddress: false,
        noDNI: false,
        dniValidated: false,
        addressValidated: false,
        minor: null
      };
    },
    getAge(dateString) {
      let today = new Date();
      let birthDate = new Date(dateString);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
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
