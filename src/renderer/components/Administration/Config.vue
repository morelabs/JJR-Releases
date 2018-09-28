<template>
  <div style="padding: 20px">
    <h3>Listas de valores</h3>
    <el-tabs
      v-if="config.id"
      v-model="activeName"
      type="card">
      <el-tab-pane
        label="Ipp"
        name="ipp">
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Observaciones</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.ippobservations }}</div></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        label="Organizaciones"
        name="organizations">
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Tipo de recursos</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.organizationresourcetypes }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Ambitos</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.organizationscopes }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Descripciones</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.organizationdescriptions }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Caracteristicas</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.organizationcharacteristics }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Objetivos</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.organizationaims }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Palabras Clave</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.organizationkeywords }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Condiciones de ingreso</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.organizationentryconditions }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Formas de ingreso</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.organizationentrymodes }}</div></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        label="Programas"
        name="programs">
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Tareas</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.programtasks }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Requisitos</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.programrequirements }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Habilidades</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.programskills }}</div></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        label="Referentes"
        name="referents">
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Rubros</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.referentareas }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Cargos</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.attributes.referentpositions }}</div></el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: configGetters, mapActions: configActions } = namespace(
  "admin"
);
export default {
  name: "AdminConfig",
  data() {
    return {
      activeName: "ipp",
      config: {}
    };
  },
  created() {
    this.loadConfig();
  },
  methods: {
    ...configActions(["fetchConfig"]),
    loadConfig() {
      this.loading = true;
      this.fetchConfig({
        criteria: this.criteria
      })
        .then(response => {
          this.loading = false;
          this.config = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
</style>
