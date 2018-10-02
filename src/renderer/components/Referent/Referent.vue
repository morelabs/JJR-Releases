<template>
  <div id="referents-data">
    <div class="page-header">
      <span>Datos del Referente</span>
      <router-link :to="{ name: 'editReferent', params: { id: $route.params.id } }">
        <el-button type="warning">Editar</el-button>
      </router-link>
    </div>
    <div
      v-if="referent.id"
      class="data">
      <p>Apellidos: {{ referent.lastname }}</p>
      <p>Nombres: {{ referent.firstname }}</p>
      <p>Cargo: {{ referent.position }}</p>
      <p>Teléfono: {{ referent.phone }}</p>
      <p>Celular: {{ referent.cellphone }}</p>
      <p>Email: {{ referent.email }}</p>
      <p>Dirección: {{ referent.address }}</p>
      <p>Ciudad: {{ referent.city.name }}</p>
      <p>Zonas: {{ referent.zones }}</p>
      <p>Rubros: {{ referent.areas }}</p>
    </div>
  </div>
</template>


<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: referentGetters, mapActions: referentActions } = namespace(
  "referent"
);

export default {
  name: "Referent",
  data() {
    return {
      loading: false,
      referent: {}
    };
  },
  created() {
    this.loadReferent();
  },
  methods: {
    ...referentActions(["fetchReferent"]),
    loadReferent() {
      this.loading = true;
      this.fetchReferent({ referentId: this.$route.params.id })
        .then(response => {
          this.referent = response.referent;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style>
#referents-data {
  background: #fff;
  height: 100%;
}

.data {
  padding: 0px 20px;
}
</style>
