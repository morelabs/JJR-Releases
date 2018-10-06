<template>
  <div id="programs-data">
    <div class="page-header">
      <span>Datos del Programa</span>
      <router-link :to="{ name: 'editProgram', params: { id: $route.params.id } }">
        <el-button type="warning">Editar</el-button>
      </router-link>
      <router-link :to="{ name: 'programs' }">
        <el-button type="info">Volver</el-button>
      </router-link>
    </div>
    <div
      v-if="program.id"
      class="data">
      <p>Nombre: {{ program.name }}</p>
      <p>Tareas: {{ program.tasks }}</p>
      <p>Requerimientos: {{ program.requirements }}</p>
      <p>Habilidades: {{ program.skills }}</p>
    </div>
  </div>
</template>


<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: programGetters, mapActions: programActions } = namespace(
  "program"
);

export default {
  name: "Program",
  data() {
    return {
      loading: false,
      program: {}
    };
  },
  created() {
    this.loadProgram();
  },
  methods: {
    ...programActions(["fetchProgram"]),
    loadProgram() {
      this.loading = true;
      this.fetchProgram({ programId: this.$route.params.id })
        .then(response => {
          this.program = response.program;
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

<style>
#programs-data {
  background: #fff;
  height: 100%;
}

.data {
  padding: 0px 20px;
}
</style>
