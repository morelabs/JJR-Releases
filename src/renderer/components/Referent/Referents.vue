<template>
  <div id="referents-list">
    <div class="page-header">Listado Referentes</div>
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
  "referents"
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
