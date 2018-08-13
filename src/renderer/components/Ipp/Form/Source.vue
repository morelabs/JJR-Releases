<template>
  <div>
    <h1>Origen</h1>
    <el-form-item style="padding-top: 10px; margin-top: 10px; border-top: solid 1px #ccc;">
      <el-button
        type="primary"
        style="float: left"
        @click="goBack()">
        <fw-icon icon="chevron-left"/>
        Volver
      </el-button>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "PeopleInvolved",
  methods: {
    goBack() {
      this.$emit("next", 3);
    },
    save() {
      console.log("Save");
    }
  }
};
</script>
