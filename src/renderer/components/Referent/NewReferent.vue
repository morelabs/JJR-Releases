<template>
  <div id="referents-data">
    <div class="page-header">
      <span>Nuevo Referente</span>
      <router-link :to="{ name: 'referents' }">
        <el-button type="info">Volver</el-button>
      </router-link>
    </div>
    <div
      class="data">
      <referent-form
        :referent="referent"
        @save="submit"
        @reset="reset"/>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
import ReferentForm from "./ReferentForm";
const { mapActions: referentActions } = namespace("referent");

export default {
  name: "NewReferent",
  components: { ReferentForm },
  data() {
    return {
      referent: {}
    };
  },
  methods: {
    ...referentActions(["addReferent"]),
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
      this.addReferent(payload)
        .then(response => {
          this.$message.success("Se creó el referente");
          this.$router.push({
            name: "referent",
            params: { id: response.referent.id }
          });
        })
        .catch(error => {
          console.log("error grabando referente", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    reset() {
      this.referent = {};
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
