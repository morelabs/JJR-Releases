<template>
  <div id="programs-list">
    <div class="page-header">Listado Programas</div>
    <div class="list">
      <el-table
        :data="programs"
        height="735"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="Nombre"/>
        <el-table-column
          prop="vacants"
          label="Vacantes"/>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary">Ir al programa</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: programGetters, mapActions: programActions } = namespace(
  "programs"
);

export default {
  name: "Programs",
  data() {
    return {
      loading: false,
      programs: [],
      criteria: "",
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      columns: [
        {
          title: "Nombre",
          dataIndex: "name",
          key: "name",
          width: "80%",
          sorter: true,
          scopedSlots: {
            customRender: "name"
          }
        },
        {
          title: "Vacantes",
          dataIndex: "vacants",
          key: "vacants",
          width: "10%"
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
#programs-list {
  background: #fff;
  height: 100%;
}

.list {
  padding: 0px 20px;
}
</style>
