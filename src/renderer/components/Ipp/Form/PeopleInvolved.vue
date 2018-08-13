<template>
  <div>
    <div style="padding-left: 200px;">
      <h3>Nuevo Victimario</h3>
    </div>
    <el-form-item label="Nombre completo">
      <el-input
        v-model="newVictimizer.name"
        name="number"
        style="width: 50%;"
        placeholder="Nombre completo"/>
    </el-form-item>
    <el-form-item label="DNI">
      <el-input
        v-model="newVictimizer.dni"
        name="number"
        style="width: 50%;"
        placeholder="DNI"/>
    </el-form-item>
    <el-form-item label="Direccion">
      <el-input
        v-model="newVictimizer.address"
        name="number"
        style="width: 50%;"
        placeholder="Direccion"/>
      <el-button>Validar</el-button>
      <el-button :disabled="true">Agregar</el-button>
    </el-form-item>
    <hr>
    <div style="padding-left: 200px;">
      <h3>Nueva Victima</h3>
    </div>
    <el-form-item label="Nombre completo">
      <el-input
        v-model="newVictim.name"
        name="number"
        style="width: 50%;"
        placeholder="Nombre completo"/>
    </el-form-item>
    <el-form-item label="DNI">
      <el-input
        v-model="newVictim.dni"
        name="number"
        style="width: 50%;"
        placeholder="DNI"/>
    </el-form-item>
    <el-form-item label="Direccion">
      <el-input
        v-model="newVictim.address"
        name="number"
        style="width: 50%;"
        placeholder="Direccion"/>
      <el-button>Validar</el-button>
      <el-button :disabled="true">Agregar</el-button>
    </el-form-item>
    <el-form-item style="padding-top: 10px; margin-top: 10px; border-top: solid 1px #ccc;">
      <el-button
        type="primary"
        style="float: left"
        @click="goBack()">
        <fw-icon icon="chevron-left"/>
        Volver
      </el-button>
      <el-button
        type="primary"
        style="float: right"
        @click="goNext()">
        Siguiente
        <fw-icon icon="chevron-right"/>
      </el-button>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "PeopleInvolved",
  data() {
    return {
      newVictim: {
        name: "",
        dni: "",
        adult: false,
        address: ""
      },
      newVictimizer: {
        name: "",
        dni: "",
        adult: false,
        address: ""
      },
      ipp: {
        victimizers: [],
        victims: []
      }
    };
  },
  methods: {
    goBack() {
      this.$emit("next", 1);
    },
    goNext() {
      this.$emit("next", 3);
    }
  }
};
</script>
