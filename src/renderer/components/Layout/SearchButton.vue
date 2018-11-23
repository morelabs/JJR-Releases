<template>
  <div class="search-form">
    <div
      @click="openSearch()">
      <span>Buscar</span>
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

<style>
.search-form,
.search-form-collapsed {
  padding: 10px;
  margin: 20px 10px 0px 10px;
  background: rgb(103, 111, 122);
  border-color: transparent;
  color: #c7c7c7;
  opacity: 0.5;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}

.search-form-collapsed {
  display: none;
}
.el-aside.main-side-menu.collapsed .search-form {
  display: none;
}
.el-aside.main-side-menu.collapsed .search-form-collapsed {
  display: block;
  text-align: center;
  cursor: pointer;
}
</style>
