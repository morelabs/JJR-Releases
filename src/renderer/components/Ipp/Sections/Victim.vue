<template>
  <div class="person-info">
    <p>{{ fullname }}</p>
    <p>DNI: {{ victim.person.document_number || "-----" }}</p>
    <p>
      <router-link :to="{ name: 'subject', params: { id: victim.id } }">
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
  name: "Victim",
  props: {
    victim: {
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
      return `${this.victim.person.lastname},
        ${this.victim.person.firstname}`;
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
