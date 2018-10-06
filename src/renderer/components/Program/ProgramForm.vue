<template>
  <el-form
    ref="form"
    :model="program"
    label-position="top" 
    label-width="120px">
    <el-form-item label="Nombre">
      <el-input v-model="program.name"/>
    </el-form-item>
    <el-form-item label="Tareas">
      <el-select
        v-model="program.tasks"
        multiple
        filterable
        style="width: 100%"
        placeholder="Select">
        <el-option
          v-for="item in tasksOptions"
          :key="item"
          :label="item"
          :value="item"/>
      </el-select>
    </el-form-item>
    <el-form-item label="Requerimientos">
      <el-select
        v-model="program.requirements"
        multiple
        filterable
        style="width: 100%"
        placeholder="Select">
        <el-option
          v-for="item in requirementsOptions"
          :key="item"
          :label="item"
          :value="item"/>
      </el-select>
    </el-form-item>
    <el-form-item label="Habilidades">
      <el-select
        v-model="program.skills"
        multiple
        filterable
        style="width: 100%"
        placeholder="Select">
        <el-option
          v-for="item in skillsOptions"
          :key="item"
          :label="item"
          :value="item"/>
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
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: listValuesActions } = namespace("admin");

export default {
  name: "ProgramForm",
  props: {
    program: { type: Object, required: true }
  },
  data() {
    return {
      tasksOptions: [],
      requirementsOptions: [],
      skillsOptions: []
    };
  },
  created() {
    this.loadProgramTasks();
    this.loadProgramRequirements();
    this.loadProgramSkills();
  },
  methods: {
    ...listValuesActions(["fetchListValues"]),
    loadProgramTasks() {
      this.loading = true;
      this.fetchListValues({ list: "program_tasks" })
        .then(response => {
          this.tasksOptions = response;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadProgramRequirements() {
      this.loading = true;
      this.fetchListValues({ list: "program_requirements" })
        .then(response => {
          this.requirementsOptions = response;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadProgramSkills() {
      this.loading = true;
      this.fetchListValues({ list: "program_skills" })
        .then(response => {
          this.skillsOptions = response;
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
