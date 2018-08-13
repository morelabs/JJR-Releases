<template>
  <div id="dashboard">
    <el-row :gutter="12">
      <el-col :span="8">
        <router-link :to="{ name: 'newIpp' }">
          <el-card
            class="option"
            shadow="hover">
            <i class="el-icon-plus"></i>
            <p>Nuevo IPP</p>
          </el-card>
        </router-link>
      </el-col>
      <el-col :span="8">
        <el-card
          class="option"
          shadow="hover">
          <i class="el-icon-search"></i>
          <p>Expedientes</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card
          class="option"
          shadow="hover">
          <i class="el-icon-tickets"></i>
          <p>Administracion</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Dashboard"
};
</script>

<style>
#dashboard {
  margin: 30px 0px;
  text-align: center;
}
#dashboard a {
  text-decoration: none;
  color: #888;
}
.option {
  font-size: 20px;
}
</style>
