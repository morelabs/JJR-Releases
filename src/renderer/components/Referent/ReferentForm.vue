<template>
  <el-form
    ref="form"
    :model="referent"
    label-position="top" 
    label-width="120px">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Nombres">
          <el-input v-model="referent.firstname"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Apellidos">
          <el-input v-model="referent.lastname"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Telefono">
          <el-input v-model="referent.phone"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Celular">
          <el-input v-model="referent.cellphone"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Email">
          <el-input v-model="referent.email"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Direccion">
          <el-input v-model="referent.address"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Cargo">
          <el-select
            v-model="referent.position"
            filterable
            style="width: 100%"
            placeholder="Select">
            <el-option
              v-for="item in positionOptions"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Rubros">
          <el-select
            v-model="referent.areas"
            multiple
            filterable
            style="width: 100%"
            placeholder="Select">
            <el-option
              v-for="item in areaOptions"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Zonas">
      <el-select
        v-model="referent.zoneids"
        multiple
        filterable
        style="width: 100%"
        placeholder="Select">
        <el-option
          v-for="item in zoneOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id"/>
      </el-select>
    </el-form-item>
    <hr>
    <el-form-item>
      <el-button
        type="success"
        @click="onSubmit">Guardar</el-button>
      <el-button
        type="danger"
        @click="onReset">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: listValuesActions } = namespace("admin");
const { mapActions: zoneActions } = namespace("zone");

export default {
  name: "ReferentForm",
  props: {
    referent: { type: Object, required: true }
  },
  data() {
    return {
      areaOptions: [],
      positionOptions: [],
      zoneOptions: []
    };
  },
  created() {
    this.loadReferentAreas();
    this.loadReferentPositions();
    this.loadZones();
  },
  methods: {
    ...listValuesActions(["fetchListValues"]),
    ...zoneActions(["fetchZones"]),
    loadReferentAreas() {
      this.loading = true;
      this.fetchListValues({ list: "referent_areas" })
        .then(response => {
          this.areaOptions = response;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadReferentPositions() {
      this.loading = true;
      this.fetchListValues({ list: "referent_positions" })
        .then(response => {
          this.positionOptions = response;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadZones() {
      this.loading = true;
      this.fetchZones({ criteria: "" })
        .then(response => {
          this.zoneOptions = response;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onSubmit() {
      this.$emit("save");
    },
    onReset() {
      this.$emit("reset");
    }
  }
};
</script>
