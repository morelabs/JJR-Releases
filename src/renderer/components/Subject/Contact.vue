<template>
  <div class="contact-data">
    <el-row :gutter="20">
      <el-col :span="16">
        {{ contact.contact_type }}
      </el-col>
      <el-col :span="4">
        {{ contact.value }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Contact",
  props: {
    contact: {
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
.contact-data {
  /*border-top: solid 1px #eee;*/
  padding: 5px 0px;
}
</style>
