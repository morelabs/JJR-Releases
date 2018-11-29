<template>
  <div class="person-data">
    <div>
      <div 
        v-show="isDisabled"
        class="edit-buttons">
        <a
          class="edit"
          @click="enableEdit()"><i class="el-icon-edit"></i> EDITAR</a>
      </div>
      <div
        v-show="!isDisabled"
        class="edit-buttons">
        <a
          class="cancel"
          @click="cancelEdit()">CANCELAR</a>
        <a
          class="save"
          @click="savePerson()">GUARDAR</a>
      </div>
    </div>
    <el-form
      ref="form"
      label-width="90px">
      <el-form-item
        label="Nombre">
        <el-row
          :gutter="20"
          style="margin: 0px;">
          <el-col
            :span="12"
            style="padding-left: 0px; float: left;">
            <el-input
              v-model="originalPerson.firstname"
              :readonly="isDisabled"
              size="small"/>
          </el-col>
          <el-col
            :span="12"
            style="padding-right: 0px; float: right;">
            <el-input
              v-model="originalPerson.lastname"
              :readonly="isDisabled"
              size="small"/>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        label="DNI">
        <el-col :span="24">
          <div class="el-input el-input--small">
            <the-mask
              v-model="originalPerson.document_number"
              :readonly="isDisabled"
              :mask="['##.###.###', '#.###.###']"
              class="el-input__inner"
              placeholder="Documento de identidd"/>
          </div>
        </el-col>
      </el-form-item>
      <el-form-item
        label="Genero">
        <el-col :span="24">
          <el-radio-group
            v-model="originalPerson.gender"
            :readonly="isDisabled"
            style="text-align: left;"
            size="small">
            <el-radio-button label="Fem"/>
            <el-radio-button label="Masc"/>
            <el-radio-button label="Otro"/>
          </el-radio-group>
        </el-col>
      </el-form-item>
      <el-form-item
        label="Fecha Nac.">
        <el-col :span="24">
          <el-date-picker
            v-model="originalPerson.birth_date"
            :clearable="true"
            :format="dateFormat"
            :readonly="isDisabled"
            style="width: 100%;"
            placeholder="Fecha de nacimiento"/>
        </el-col>
      </el-form-item>
      <el-form-item
        label="Direccion">
        <el-col :span="24">
          <el-input
            v-model="originalPerson.address"
            :readonly="isDisabled"
            size="small"
            placeholder="Direccion"/>
        </el-col>
      </el-form-item>  
    </el-form>
  </div>
</template>

<script>
import { clone } from "lodash";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: subjectActions } = namespace("person");

export default {
  name: "SubjectPerson",
  props: {
    person: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      loading: false,
      isDisabled: true,
      dateFormat: "dddd dd, MMMM yyyy",
      originalPerson: {}
    };
  },
  created() {
    this.originalPerson = clone(this.person);
  },
  methods: {
    ...subjectActions(["savePersonData"]),
    enableEdit() {
      this.isDisabled = false;
    },
    cancelEdit() {
      this.originalPerson = clone(this.person);
      this.isDisabled = true;
    },
    savePerson() {
      let params = clone(this.originalPerson);
      delete params.id;

      this.savePersonData({ personId: this.person.id, params: params })
        .then(response => {
          this.isDisabled = true;
          this.$emit("update-person", this.originalPerson);
        })
        .catch(error => {
          this.isDisabled = true;
        });
    }
  }
};
</script>

<style lang="scss">
.person-data {
  input[readonly="readonly"] {
    background: #f1f1f1 !important;
  }
  .el-radio-group[readonly="readonly"] {
    .is-active {
      .el-radio-button__inner {
        color: #333;
        background: #ccc !important;
        border-color: #ccc !important;
        box-shadow: -1px 0 0 0 #ccc !important;
      }
    }
    .el-radio-button__inner {
      background: #f1f1f1 !important;
    }
  }
  .el-form-item__label {
    text-align: left !important;
  }
}
</style>
