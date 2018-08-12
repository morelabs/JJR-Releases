<template>
  <div id="dashboard">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card
          class="option"
          shadow="hover">
          <i class="el-icon-plus"></i>
          <p>Nuevo IPP</p>
        </el-card>
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
.option {
  font-size: 20px;
}
</style>
