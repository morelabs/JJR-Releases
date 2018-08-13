<template>
  <div>
    <el-form-item label="Numero">
      <el-input
        v-model="ipp.number"
        name="number"
        style="width: 50%;"
        placeholder="Numero: XX-XX-XXXX-XX"/>
    </el-form-item>
    <el-form-item label="Fecha del hecho">
      <el-date-picker
        v-model="ipp.commited_at"
        :clearable="true"
        format="dd/MM/yyyy"
        style="width: 50%;"
        name="commited_at"
        placeholder="DD/MM/YYYY"/>
    </el-form-item>
    <el-form-item label="Fecha de la denuncia">
      <el-date-picker
        v-model="ipp.reported_at"
        :clearable="true"
        format="dd/MM/yyyy"
        style="width: 50%;"
        name="commited_at"
        placeholder="DD/MM/YYYY"/>
    </el-form-item>
    <el-form-item label="Inputados">
      <el-input-number
        v-model="ipp.total_involved"
        :min="1"
        name="total_involved"/>
    </el-form-item>
    
    <el-form-item style="padding-top: 10px; margin-top: 10px; border-top: solid 1px #ccc;">
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
  name: "BasicData",
  data() {
    return {
      ipp: {
        number: "",
        commited_at: "",
        reported_at: "",
        total_involved: 1
      }
    };
  },
  methods: {
    goNext() {
      this.$emit("next", 2);
    }
  }
};
</script>
