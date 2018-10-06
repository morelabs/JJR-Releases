<template>
  <div style="padding: 20px">
    <h3>Listas de valores</h3>
    <el-tabs
      v-if="config"
      v-model="activeName"
      type="card">
      <el-tab-pane
        label="Ipp"
        name="ipp">
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Observaciones</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.ipp_observation_list }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Definiciones</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.ipp_definition_list }}</div></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        label="Organizaciones"
        name="organizations">
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Tipo de recursos</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.organization_resource_type_list }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Ambitos</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.organization_scope_list }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Descripciones</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.organization_description_list }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Caracteristicas</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.organization_characteristic_list }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Objetivos</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.organization_aim_list }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Palabras Clave</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.organization_keyword_list }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Condiciones de ingreso</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.organization_entry_condition_list }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Formas de ingreso</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.organization_entry_mode_list }}</div></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        label="Programas"
        name="programs">
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Tareas</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.program_task_list }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Requisitos</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.program_requirement_list }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Habilidades</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.program_skill_list }}</div></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        label="Referentes"
        name="referents">
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Rubros</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.referent_area_list }}</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" ><div class="lov-name">Cargos</div></el-col>
          <el-col :span="16"><div class="lov-values">{{ config.referent_position_list }}</div></el-col>
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
          this.config = response.main_config;
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
