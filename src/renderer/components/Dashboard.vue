<template>
  <div id="dashboard">
    <el-row :gutter="12">
      <el-col :span="6">
        <el-card
          class="option"
          shadow="hover">
          <i class="el-icon-search"></i>
          <p>IPP's</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          class="option"
          shadow="hover">
          <i class="el-icon-search"></i>
          <p>Expedientes</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          class="option"
          shadow="hover">
          <i class="el-icon-tickets"></i>
          <p>Administracion</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          class="option"
          shadow="hover">
          <i class="el-icon-tickets"></i>
          <p>Test</p>
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
  text-align: center;
  padding: 20px;
}
#dashboard a {
  text-decoration: none;
  color: #888;
}
.option {
  font-size: 20px;
}
</style>
