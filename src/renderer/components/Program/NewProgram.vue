<template>
  <div class="page">
    <div class="page-header">
      <router-link
        :to="{ name: 'programs' }"
        style="float: left; margin: 5px 20px 5px 0px; font-size: 20px;"><i class="el-icon-back"></i></router-link>
      <h2>
        Red
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        Programa
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        Nuevo
      </h2>
    </div>
    <div class="page-content">
      <div class="page-form">
        <program-form
          :program="program"
          @save="submit"
          @reset="reset"/>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
import ProgramForm from "./ProgramForm";
const { mapActions: programActions } = namespace("program");

export default {
  name: "NewProgram",
  components: { ProgramForm },
  data() {
    return {
      program: {}
    };
  },
  methods: {
    ...programActions(["addProgram"]),
    submit() {
      let payload = {
        name: this.program.name,
        tasks: this.program.tasks,
        requirements: this.program.requirements,
        skills: this.program.skills
      };
      this.loading = true;
      this.addProgram(payload)
        .then(response => {
          this.$message.success("Se creó el programa");
          this.$router.push({
            name: "program",
            params: { id: response.program.id }
          });
        })
        .catch(error => {
          console.log("error grabando programa", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {
      this.program = {};
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
