<template>
  <div style="padding: 20px">
    <div class="page-header">
      <span>Editar Referente</span>
      <router-link :to="{ name: 'referent', params: { id: $route.params.id } }">
        <el-button type="warning">Cancelar</el-button>
      </router-link>
    </div>
    <h3>{{ $route.params.id }}</h3>
    <el-form
      ref="form"
      :model="referent"
      label-width="120px">
      <el-form-item label="Nombres">
        <el-input v-model="referent.firstname"/>
      </el-form-item>
      <el-form-item label="Apellidos">
        <el-input v-model="referent.lastname"/>
      </el-form-item>
      <el-form-item label="Rubros">
        <el-select
          v-model="referent.areas"
          multiple
          style="width: 100%"
          placeholder="Select">
          <el-option
            v-for="item in areaOptions"
            :key="item"
            :label="item"
            :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!--
        <el-button
          type="primary"
          @click="onSubmit">Guardar</el-button>
        <el-button>Cancelar</el-button>
        -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: referentGetters, mapActions: referentActions } = namespace(
  "referent"
);
const { mapActions: listValuesActions } = namespace("admin");

export default {
  name: "EditReferent",
  data() {
    return {
      loading: false,
      referent: {},
      areaOptions: []
    };
  },
  created() {
    this.loadReferent();
    this.loadReferentAreas();
  },
  methods: {
    ...referentActions(["fetchReferent"]),
    ...listValuesActions(["fetchListValues"]),
    loadReferent() {
      this.loading = true;
      this.fetchReferent({ referentId: this.$route.params.id })
        .then(response => {
          this.referent = response.data.attributes;
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
    }
  }
};
</script>
