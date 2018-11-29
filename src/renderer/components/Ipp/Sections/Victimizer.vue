<template>
  <div class="person-info">
    <p>{{ fullname }}</p>
    <p>DNI: {{ victimizer.person.document_number || "-----" }}</p>
    <div class="user-actions">
      <router-link :to="{ name: 'subject', params: { id: victimizer.id } }">
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
import { clone } from "lodash";

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
    return {
      person: {},
      isOpen: false
    };
  },
  computed: {
    fullname() {
      return `${this.victimizer.person.lastname},
        ${this.victimizer.person.firstname}`;
    }
  },
  created() {
    this.person = clone(this.victimizer.person);
  },
  methods: {
    updatePerson(data) {
      this.person = data;
    },
    openModal() {
      this.$emit("open-modal");
    }
  }
};
</script>

<style lang="scss" scoped>
.person-info {
  padding: 20px 10px;
  margin-bottom: 20px;
  background: #fafafa;
}
</style>
