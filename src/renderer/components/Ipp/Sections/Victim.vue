<template>
  <div class="person-info">
    <p>{{ fullname }}</p>
    <p>DNI: {{ victim.person.document_number || "-----" }}</p>
    <div class="user-actions">
      <router-link :to="{ name: 'subject', params: { id: victim.id } }">
        <el-button
          size="mini"
          type="danger">
          Ver expediente
        </el-button>
      </router-link>
      <el-button
        type="danger"
        size="mini"
        @click="openModal()">Editar Datos Personales</el-button>
    </div>
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
  },
  methods: {
    openModal() {
      this.$emit("open-modal");
    }
  }
};
</script>

<style lang="css" scoped>
.person-info {
  padding: 20px 10px;
  margin-bottom: 20px;
  background: #fafafa;
}
</style>
