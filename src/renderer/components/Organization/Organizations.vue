<template>
  <div class="page">
    <div class="page-header">
      <h2>
        Red
        <span class="sep"><i class="el-icon-arrow-right"/></span>
        Organizaciones e Instituciones
      </h2>
    </div>
    <div class="page-content">
      <div class="list">
        <el-table
          :data="organizations"
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
                type="primary">Ir a la organización</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const {
  mapGetters: organizationGetters,
  mapActions: organizationActions
} = namespace("organizations");

export default {
  name: "Organizations",
  data() {
    return {
      loading: false,
      organizations: [],
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
#organizations-list {
  background: #fff;
  height: 100%;
}

.list {
  padding: 0px 20px;
}
</style>
