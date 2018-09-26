<template>
  <div class="page-not-found">
    <h1>
      Nos perdimos... 404
      <br>
      <a-icon type="frown-o" />
    </h1>
    <a-divider/>
    <a-row :gutter="60">
      <a-col
        :span="6"
        :offset="6">
        <a-button 
          type="primary"
          size="large"
          style="width: 100%"
          @click="goBack()">
          <a-icon type="arrow-left"/>
          Volver
        </a-button>
      </a-col>
      <a-col :span="6">
        <a-button 
          type="primary"
          size="large"
          style="width: 100%"
          @click="goHome()">
          Ir al inicio
          <a-icon type="arrow-right"/>
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push({ name: "dashboard" });
    }
  }
};
</script>

<style>
.page-not-found {
  width: 40%;
  margin: 50px auto;
  text-align: center;
}
.page-not-found h1 {
  color: #e84234;
  font-size: 40px;
}
</style>
