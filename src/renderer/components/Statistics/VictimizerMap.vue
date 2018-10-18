<template>
  <el-container>
    <el-header>
      <div class="page-header"><h2>Mapa de hechos</h2></div>
    </el-header>
    <el-main>
      <shared-map
        :points="[
          ['Domicilio victima', -58.522131443023675, -34.465293284801774],
          ['Domicilio victimario', -58.51979255676269, -34.46665549519278],
          ['Lugar del hecho', -58.5171103477478, -34.469468300847005],
          ['Comisaría interviniente', -58.52123022079468, -34.46934446863058]]"/>
      <p></p>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix">
              <span>IPP: <b>14-00-001978-18</b></span>
            </div>
            <p class="line"><small>Origen</small><br><b>Fiscalía</b></p>
            <p class="line"><small>Hecho</small><br><b>22/03/2018</b></p>
            <p class="line"><small>Denuncia</small><br><b>22/03/2018</b></p>
            <p class="line"><small>Comisaría</small><b>11</b></p>
            <p class="line"><small>Estado</small><br><b>No punible - Archivado</b></p>
            <p class="line"><small>Definición</small><br><b>Participa del programa</b></p>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix">
              <span>Victimas</span>
            </div>
            <div class="text item">
              <ul class="no-style">
                <li>Lucia del Pilar	BORDA</li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix">
              <span>Victimarios</span>
            </div>
            <div class="text item">
              <ul class="no-style">
                <li>Morena Yanella SARLY</li>
                <li>Adrian CORREA</li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix">
              <span>Delitos</span>
            </div>
            <div class="text item">
              <ul class="no-style">
                <li>Lesiones leves</li>
              </ul>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
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

<style type="text/css">
.box-card {
  height: 400px;
  overflow: scroll;
}
.el-card__body {
  padding: 0px 10px !important;
}
p.line {
  margin: 10px;
}
ul.no-style {
  list-style: all;
  padding: 0px;
  margin: 0px 20px;
}
ul li {
  margin: 10px 0px;
  color: #999;
}
</style>
