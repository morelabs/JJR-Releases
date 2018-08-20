<template>
  <div>
    <div
      class="search-form"
      @click="openSearch()">
      <span>Buscador avanzado...</span>
      <div style="float: right"><i class="el-icon-search"></i></div>
    </div>
    <div
      class="search-form-collapsed"
      @click="openSearch()">
      <i class="el-icon-search"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchButton",
  methods: {
    openSearch() {
      this.$emit("open-search");
    }
  }
};
</script>
