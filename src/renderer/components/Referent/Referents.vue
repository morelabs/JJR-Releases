<template>
  <div id="referents-list">
    <div class="page-header">Listado Referentes</div>
    <div class="list">
      <el-table
        :data="referents"
        height="735"
        style="width: 100%">
        <el-table-column
          prop="attributes.firstname"
          label="Nombre"/>
        <el-table-column
          prop="attributes.lastname"
          label="Apellido"/>
        <el-table-column
          prop="attributes.phone"
          label="Teléfono"/>
        <el-table-column
          prop="attributes.cellphone"
          label="Celular"/>
        <el-table-column
          prop="attributes.email"
          label="Email"/>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary">Ir al referente</el-button>
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
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      columns: [
        {
          title: "Nombre",
          dataIndex: "firstname",
          key: "firstname",
          width: "80%",
          sorter: true,
          scopedSlots: {
            customRender: "firstname"
          }
        },
        {
          title: "Apellidos",
          dataIndex: "lastname",
          key: "lastname",
          width: "80%",
          sorter: true,
          scopedSlots: {
            customRender: "lastname"
          }
        },
        {
          title: "",
          dataIndex: "",
          width: "10%",
          scopedSlots: {
            customRender: "operation"
          }
        }
      ]
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
          this.referents = response.data;
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
