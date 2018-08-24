<template>
  <div>
    <div class="page-header">Mapa de hechos</div>
    <shared-map :points="[]"/>
  </div>
</template>

<script>
import SharedMap from "@/components/Shared/Map";
export default {
  name: "VictimizersMap",
  components: { SharedMap },
  data() {
    return {
      loading: false
    };
  }
};
</script>
