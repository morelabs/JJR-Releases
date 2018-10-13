<template>
  <el-container>
    <el-header>
      <div class="page-header">Mapa de hechos</div>
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
            <div class="text item">
              <p>IPP: <b>14-00-001978-18</b> - Origen: <b>Fiscalía</b></p>
              <p>Hecho: <b>22/03/2018</b> - Denuncia: <b>22/03/2018</b></p>
              <p>Comisaría: <b>11</b></p>
              <p>Estado: <b>No punible - Archivado</b></p>
              <p>Definición: <b>Participa del programa</b></p>
            </div>
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
              <ul>
                <li>Lucia del Pilar	BORDA (MENOR)</li>
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
              <ul>
                <li>Morena Yanella SARLY (MENOR)</li>
                <li>Adrian CORREA	(MENOR)</li>
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
              <ul>
                <li>Lesiones leves - Consumado</li>
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
