<template>
  <div
    v-if="referent.id"
    class="page">
    <div class="page-header">
      <router-link
        :to="{ name: 'referents', params: { id: $route.params.id } }"
        style="float: left; margin: 5px 20px 5px 0px; font-size: 20px;"><i class="el-icon-back"></i></router-link>
      <h2>
        Red
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        Referente
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        Editar
      </h2>
    </div>
    <div class="page-content">
      <div class="page-form">
        <referent-form
          :referent="referent"
          @save="submit"
          @reset="loadReferent"/>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
import ReferentForm from "./ReferentForm";
const { mapActions: referentActions } = namespace("referent");

export default {
  name: "EditReferent",
  components: { ReferentForm },
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
    ...referentActions(["fetchReferent", "updateReferent"]),
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
    },
    submit() {
      let payload = {
        firstname: this.referent.firstname,
        lastname: this.referent.lastname,
        phone: this.referent.phone,
        cellphone: this.referent.cellphone,
        email: this.referent.email,
        address: this.referent.address,
        position: this.referent.position,
        zone_ids: this.referent.zoneids,
        areas: this.referent.areas
      };
      this.loading = true;
      this.updateReferent({ referentId: this.referent.id, payload: payload })
        .then(response => {
          this.$message.success("Se actualizo el referente");
          this.$router.push({
            name: "referent",
            params: { id: this.referent.id }
          });
        })
        .catch(error => {
          console.log("error grabando referente", error);
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
