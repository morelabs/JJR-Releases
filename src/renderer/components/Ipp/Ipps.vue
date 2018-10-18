<template>
  <el-container>
    <el-header>
      <div class="page-header">
        <h2>Listado de IPPs</h2>
        <div class="controls">
          <el-input
            v-model="criteria"
            style="width: 500px"
            placeholder="Buscar ipp"
            @keyup.enter.native="search">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"/>
          </el-input>
        </div>
      </div>
    </el-header>
    <el-main>
      <div id="ipps-list">
        <div class="list">
          <el-table
            :data="ipps"
            height="735"
            style="width: 100%">
            <el-table-column
              prop="ipp_number"
              label="Nro IPP"/>
            <el-table-column
              prop="event_date"
              label="Fecha del hecho"/>
            <el-table-column label="Víctimas">
              <template slot-scope="scope">
                <p
                  v-for="(vict, index) in scope.row.victims"
                  :key="index">
                  {{ vict.person.firstname }} {{ vict.person.lastname }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="Víctimarios">
              <template slot-scope="scope">
                <p
                  v-for="(vict, index) in scope.row.victimizers"
                  :key="index">
                  {{ vict.person.firstname }} {{ vict.person.lastname }}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="definition"
              label="Definicion"/>
            <el-table-column
              prop="state"
              label="Estado"/>
            <el-table-column>
              <template slot-scope="scope">
                <router-link :to="{ name: 'ipp', params: { id: scope.row.id } }">
                  <el-button
                    size="mini"
                    type="primary">
                    Ver expediente
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
const { mapActions: ippActions } = namespace("ipp");

export default {
  name: "Ipps",
  data() {
    return {
      loading: false,
      ipps: [],
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
    this.loadIPPs();
  },
  methods: {
    ...ippActions(["fetchIpps"]),
    loadIPPs() {
      this.loading = true;
      this.fetchIpps({
        criteria: this.criteria,
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      })
        .then(response => {
          this.loading = false;
          this.ipps = response.ipp_cases;
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
      this.loadIPPs();
    },
    changeSize(value) {
      this.pagination.pageSize = value;
      this.loadIPPs();
    },
    onSearch(value) {
      this.criteria = `${value}`.toLowerCase();
      this.pagination.currentPage = 1;
      this.loadIPPs();
    }
  }
};
</script>

<style>
#ipps-list {
  background: #fff;
  height: 100%;
}

.list {
  padding: 0px 20px;
}
</style>
