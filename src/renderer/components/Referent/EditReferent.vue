<template>
  <div id="referents-data">
    <div class="page-header">
      <span>Editar Referente</span>
      <router-link :to="{ name: 'referent', params: { id: $route.params.id } }">
        <el-button type="info">Volver</el-button>
      </router-link>
    </div>
    <div
      v-if="referentId"
      class="data">
      <el-form
        ref="form"
        :model="referent"
        label-position="top" 
        label-width="120px">
        <el-form-item label="Nombres">
          <el-input v-model="referent.firstname"/>
        </el-form-item>
        <el-form-item label="Apellidos">
          <el-input v-model="referent.lastname"/>
        </el-form-item>
        <el-form-item label="Telefono">
          <el-input v-model="referent.phone"/>
        </el-form-item>
        <el-form-item label="Celular">
          <el-input v-model="referent.cellphone"/>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="referent.email"/>
        </el-form-item>
        <el-form-item label="Direccion">
          <el-input v-model="referent.address"/>
        </el-form-item>
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
        <el-form-item label="Zonas">
          <el-select
            v-model="referent.zones"
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
        <el-form-item>
          <el-button
            type="success"
            @click="onSubmit">Guardar</el-button>
          <el-button
            type="danger"
            @click="onReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: referentGetters, mapActions: referentActions } = namespace(
  "referent"
);
const { mapActions: listValuesActions } = namespace("admin");
const { mapActions: zoneActions } = namespace("zone");

export default {
  name: "EditReferent",
  data() {
    return {
      loading: false,
      referent: {},
      referentId: null,
      areaOptions: [],
      positionOptions: [],
      zoneOptions: []
    };
  },
  created() {
    this.loadReferent();
    this.loadReferentAreas();
    this.loadReferentPositions();
    this.loadZones();
  },
  methods: {
    ...referentActions(["fetchReferent"]),
    ...listValuesActions(["fetchListValues"]),
    ...zoneActions(["fetchZones"]),
    loadReferent() {
      this.loading = true;
      this.fetchReferent({ referentId: this.$route.params.id })
        .then(response => {
          this.referent = response.data.attributes;
          this.referentId = response.data.id;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
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
      console.log("submit referent", this.referent);
    },
    onReset() {
      this.loadReferent();
    }
  }
};
</script>

<style>
#referents-data {
  background: #fff;
  height: 100%;
}

.data {
  padding: 0px 20px;
}
</style>
