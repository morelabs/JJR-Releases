<template>
  <div
    v-if="program.id"
    class="page">
    <div class="page-header">
      <router-link
        :to="{ name: 'program', params: { id: $route.params.id } }"
        style="float: left; margin: 5px 20px 5px 0px; font-size: 20px;"><i class="el-icon-back"></i></router-link>
      <h2>
        Red
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        Programa
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        Editar
      </h2>
    </div>
    <div class="page-content">
      <div class="page-form">
        <program-form
          :program="program"
          @save="submit"
          @reset="loadProgram"/>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
import ProgramForm from "./ProgramForm";
const { mapActions: programActions } = namespace("program");

export default {
  name: "EditProgram",
  components: { ProgramForm },
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
    ...programActions(["fetchProgram", "updateProgram"]),
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
    },
    submit() {
      let payload = {
        name: this.program.name,
        tasks: this.program.tasks,
        requirements: this.program.requirements,
        skills: this.program.skills
      };
      this.loading = true;
      this.updateProgram({ programId: this.program.id, payload: payload })
        .then(response => {
          this.$message.success("Se actualizo el programa");
          this.$router.push({
            name: "program",
            params: { id: this.program.id }
          });
        })
        .catch(error => {
          console.log("error grabando programe", error);
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
