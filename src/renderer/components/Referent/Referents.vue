<template>
  <div id="referents-list">
    <div class="page-header">
      Listado Referentes
      <router-link :to="{ name: 'newReferent' }">
        <el-button type="warning">Nuevo Referente</el-button>
      </router-link>
    </div>
    <div class="list">
      <el-table
        :data="referents"
        height="735"
        style="width: 100%">
        <el-table-column
          prop="firstname"
          label="Nombre"/>
        <el-table-column
          prop="lastname"
          label="Apellido"/>
        <el-table-column
          prop="phone"
          label="Teléfono"/>
        <el-table-column
          prop="cellphone"
          label="Celular"/>
        <el-table-column
          prop="email"
          label="Email"/>
        <el-table-column>
          <template slot-scope="scope">
            <router-link :to="{ name: 'referent', params: { id: scope.row.id } }">
              <el-button
                size="mini"
                type="primary">
                Ver
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: referentGetters, mapActions: referentActions } = namespace(
  "referent"
);

export default {
  name: "Referents",
  data() {
    return {
      loading: false,
      referents: [],
      criteria: "",
      pagination: {
        pageSize: 1000,
        currentPage: 1,
        total: 0
      },
      columns: []
    };
  },
  created() {
    this.loadReferents();
  },
  methods: {
    ...referentActions(["fetchReferents"]),
    loadReferents() {
      this.loading = true;
      this.fetchReferents({
        criteria: this.criteria,
        page: this.pagination.currentPage
      })
        .then(response => {
          this.loading = false;
          this.referents = response.referents;
          this.pagination.total = response.meta.total;
          this.pagination.currentPage = this.pagination.currentPage;
        })
        .catch(error => {
          console.log(error);
        });
    },
    search() {
      console.log("search");
    },
    changePage(value) {
      this.pagination.currentPage = value;
      this.loadReferents();
    },
    onSearch(value) {
      this.criteria = `${value}`.toLowerCase();
      this.pagination.currentPage = 1;
      this.loadReferents();
    }
  }
};
</script>

<style>
#referents-list {
  background: #fff;
  height: 100%;
}

.list {
  padding: 0px 20px;
}
</style>
