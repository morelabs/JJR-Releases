<template>
  <div
    v-if="referent.id"
    class="page">
    <div class="page-header">
      <router-link
        :to="{ name: 'referents' }"
        style="float: left; margin: 5px 20px 5px 0px; font-size: 20px;"><i class="el-icon-back"></i></router-link>
      <div class="controls">
        <router-link :to="{ name: 'editReferent', params: { id: $route.params.id } }">
          <el-button type="warning">Editar</el-button>
        </router-link>
      </div>
      <h2>
        Red
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        Referente
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        {{ referent.lastname }}, {{ referent.firstname }}
      </h2>
    </div>
    <div class="page-content">
      <div class="list">
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
