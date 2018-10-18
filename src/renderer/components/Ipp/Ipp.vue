<template>
  <div id="ipps-data">
    <div class="page-header">
      <h2>IPP - Nro. <span v-if="ipp.id">{{ ipp.ipp_number }}</span></h2>
      <div class="controls">
        <router-link :to="{ name: 'ipps' }">
          <el-button type="info">Volver</el-button>
        </router-link>
      </div>
    </div>
    <div class="data">
      <p>Numero: {{ ipp.ipp_number }}</p>
    </div>
  </div>
</template>


<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: ippActions } = namespace("ipp");

export default {
  name: "Ipp",
  data() {
    return {
      loading: false,
      ipp: {}
    };
  },
  created() {
    this.loadIpp();
  },
  methods: {
    ...ippActions(["fetchIpp"]),
    loadIpp() {
      this.loading = true;
      this.fetchIpp({ ippId: this.$route.params.id })
        .then(response => {
          this.ipp = response.ipp_case;
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
#ipps-data {
  background: #fff;
  height: 100%;
}

.data {
  padding: 0px 20px;
}
</style>
