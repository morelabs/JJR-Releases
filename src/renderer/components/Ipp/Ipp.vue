<template>
  <div class="page">
    <div class="page-header">
      <div class="controls">
        <router-link :to="{ name: 'ipps' }">
          <el-button type="info">Volver</el-button>
        </router-link>
      </div>
      <h2>IPP - Nro. <span v-if="ipp.id">{{ ipp.ipp_number }}</span></h2>
    </div>
    <div class="page-content no-bottom">
      <div class="list">
        <div class="ipp-top-info">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-card class="box-card">
                <h4>Asignados</h4>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="box-card">
                <h4>Estado actual</h4>
                <p v-if="ipp.case_state">{{ ipp.case_state.name }}</p>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="box-card">
                <h4>Proxima fecha importante</h4>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="ipp-content">
          <el-tabs 
            v-model="activeName"
            :stretch="true"
            @tab-click="handleClick">
            <el-tab-pane
              label="Victimarios"
              name="first">
              <ul>
                <li
                  v-for="(vict, index) in ipp.victimizers"
                  :key="index"><victimizer :victimizer="vict"/></li>
              </ul>
            </el-tab-pane>
            <el-tab-pane
              label="Victimas"
              name="second">
              <ul>
                <li
                  v-for="(vict, index) in ipp.victims"
                  :key="index"><victim :victim="vict"/></li>
              </ul>
            </el-tab-pane>
            <el-tab-pane
              label="Asignados"
              name="third">Asignados</el-tab-pane>
            <el-tab-pane
              label="Informacion"
              name="fourth">Otra informacion</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { filter } from "lodash";
import Victimizer from "./Sections/Victimizer";
import Victim from "./Sections/Victim";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: ippActions } = namespace("ipp");

export default {
  name: "Ipp",
  components: { Victimizer, Victim },
  data() {
    return {
      loading: false,
      ipp: {},
      activeName: "first"
    };
  },
  computed: {
    victimizers() {
      if (this.ipp) {
        return filter(this.ipp.subjects, v => {
          return v.role === "victimizer";
        });
      } else {
        return [];
      }
    },
    victims() {
      if (this.ipp) {
        return filter(this.ipp.subjects, s => {
          return s.role === "victims";
        });
      } else {
        return [];
      }
    }
  },
  created() {
    this.loadIpp();
  },
  methods: {
    ...ippActions(["fetchIpp"]),
    filter: filter,
    loadIpp() {
      this.loading = true;
      this.fetchIpp({ ippId: this.$route.params.id })
        .then(response => {
          this.ipp = response.ipp_case;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleClick(tab, event) {
      console.log("Selected", tab, event);
    }
  }
};
</script>

<style scoped>
#ipps-data {
  background: #fff;
  height: 100%;
}
.ipp-top-info {
  margin: 10px 0px;
  border-bottom: solid 3px #eee;
  padding-bottom: 15px;
}
.ipp-top-info .box-card {
  height: 150px;
  text-align: center;
}
.ipp-top-info .box-card h4 {
  margin-top: 0px;
}
.ipp-content ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
.data {
  padding: 0px 20px;
}
</style>
