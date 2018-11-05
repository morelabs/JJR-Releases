<template>
  <div class="responsible-data">
    <el-row :gutter="20">
      <el-col :span="16">
        {{ responsible.bond }}: <strong>{{ responsible.full_name }}</strong>
      </el-col>
      <el-col :span="8">
        Tel: {{ responsible.phone }}
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="20">
        {{ responsible.address }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Responsible",
  props: {
    responsible: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="css" scoped>
.responsible-data {
  /*border-top: solid 1px #eee;*/
  text-align: left;
  padding: 5px 0px;
}
</style>
