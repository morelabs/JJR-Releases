<template>
  <div class="person-info">
    <p>{{ fullname }}</p>
    <p>DNI: {{ victimizer.person.document_number || "-----" }}</p>
    <p>
      <router-link :to="{ name: 'subject', params: { id: victimizer.id } }">
        <el-button
          size="mini"
          type="primary">
          Ver expediente
        </el-button>
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Victimizer",
  props: {
    victimizer: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {
    fullname() {
      return `${this.victimizer.person.lastname},
        ${this.victimizer.person.firstname}`;
    }
  }
};
</script>

<style lang="css" scoped>
.person-info {
  border-bottom: solid 1px #eee;
  padding: 10px 0px;
}
</style>
