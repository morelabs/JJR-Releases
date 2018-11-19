<template>
  <div
    v-if="program.id"
    class="page">
    <div class="page-header">
      <router-link
        :to="{ name: 'programs' }"
        style="float: left; margin: 5px 20px 5px 0px; font-size: 20px;"><i class="el-icon-back"></i></router-link>
      <div class="controls">
        <router-link :to="{ name: 'editProgram', params: { id: $route.params.id } }">
          <el-button type="warning">Editar</el-button>
        </router-link>
      </div>
      <h2>
        Red
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        Programa
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        {{ program.name }}
      </h2>
    </div>
    <div class="page-content">
      <div class="list">
        <p>Nombre: {{ program.name }}</p>
        <p>Tareas: {{ program.tasks }}</p>
        <p>Requerimientos: {{ program.requirements }}</p>
        <p>Habilidades: {{ program.skills }}</p>
      </div>
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
