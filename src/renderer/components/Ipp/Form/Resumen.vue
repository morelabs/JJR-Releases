<template>
  <div class="ipp-form-wrapper">
    <div class="ipp-form-container">
      <h3>Revision</h3>
      {{ ippForm }}
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: ippGetters, mapActions: ippActions } = namespace("ipp");

export default {
  name: "IppResumen",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...ippGetters(["ippForm"])
  },
  methods: {
    saveIpp() {
      let payload = this.parseData();
      console.log("Save ipp", payload);
    },
    parseData() {
      console.log(this.ippForm);
    },
    goBack() {
      this.$emit("next", 5);
    }
  }
};
</script>
