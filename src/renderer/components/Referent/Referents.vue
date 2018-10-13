<template>
  <el-container>
    <el-header>
      <div class="page-header">
        Listado Referentes
      </div>
    </el-header>
    <el-main>
      <div id="referents-list">
        <div class="controls">
          <router-link :to="{ name: 'newReferent' }">
            <el-button type="warning">Nuevo Referente</el-button>
          </router-link>
          <el-input
            v-model="criteria"
            style="width: 30%"
            placeholder="Buscar..."
            @keyup.enter.native="search">
            <template slot="prepend">Buscar referentes:</template>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"/>
          </el-input>
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
        <div class="footer">
          <el-pagination
            :total="pagination.totalEntries"
            :current-page="pagination.currentPage"
            :page-count="pagination.totalPages"
            :page-size="pagination.pageSize"
            :page-sizes="pagination.pageSizes"
            background
            layout="prev, pager, next, ->, jumper, sizes, total"
            @size-change="changeSize"
            @current-change="changePage"/>
        </div>
      </div>
    </el-main>
  </el-container>
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
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        offset: 0,
        currentPage: 1,
        totalEntries: 0,
        totalPages: 0
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
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      })
        .then(response => {
          this.loading = false;
          this.referents = response.referents;
          this.pagination.pageSize = response.meta.per_page;
          this.pagination.offset = response.meta.offset;
          this.pagination.currentPage = response.meta.current_page;
          this.pagination.totalEntries = response.meta.total_entries;
          this.pagination.totalPages = response.meta.total_pages;
          this.pagination.previousPage = response.meta.previous_page;
          this.pagination.nextPage = response.meta.next_page;
        })
        .catch(error => {
          console.log(error);
        });
    },
    search() {
      console.log("search");
      this.onSearch(this.criteria);
    },
    changePage(value) {
      this.pagination.currentPage = value;
      this.loadReferents();
    },
    changeSize(value) {
      this.pagination.pageSize = value;
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
