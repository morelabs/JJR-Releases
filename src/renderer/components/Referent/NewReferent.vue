<template>
  <div
    id="referents-data"
    class="page">
    <div class="page-header">
      <router-link
        :to="{ name: 'referents' }"
        style="float: left; margin: 5px 20px 5px 0px; font-size: 20px;"><i class="el-icon-back"></i></router-link>
      <h2>
        Red
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        Referentes
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        Nuevo
      </h2>
    </div>
    <div class="page-content">
      <div class="page-form">
        <referent-form
          :referent="referent"
          @save="submit"
          @reset="reset"/>
      </div>
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
