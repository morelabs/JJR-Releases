<template>
  <div id="ipps-list">
    <div class="page-header">Listado IPPs</div>
    <div class="list">
      <el-table
        :data="ipps"
        height="735"
        style="width: 100%">
        <el-table-column label="Fecha">
          <template slot-scope="scope">
            {{ scope.row.created_at | moment("dddd DD [de] MMMM, YYYY") }}
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          label="Numero"/>
        <el-table-column
          prop="state"
          label="Estado"/>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary">Ir al expediente</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ipps",
  data() {
    return {
      loading: false,
      ipps: [
        {
          id: 1,
          number: "123213-123123-123",
          created_at: new Date(),
          state: "Pendiente"
        },
        {
          id: 2,
          number: "223213-123123-123",
          created_at: new Date(),
          state: "Pendiente"
        },
        {
          id: 3,
          number: "323213-123123-123",
          created_at: new Date(),
          state: "Pendiente"
        },
        {
          id: 4,
          number: "423213-123123-123",
          created_at: new Date(),
          state: "Pendiente"
        },
        {
          id: 5,
          number: "523213-123123-123",
          created_at: new Date(),
          state: "Pendiente"
        },
        {
          id: 6,
          number: "623213-123123-123",
          created_at: new Date(),
          state: "Pendiente"
        },
        {
          id: 7,
          number: "723213-123123-123",
          created_at: new Date(),
          state: "Pendiente"
        },
        {
          id: 8,
          number: "823213-123123-123",
          created_at: new Date(),
          state: "Pendiente"
        },
        {
          id: 9,
          number: "923213-123123-123",
          created_at: new Date(),
          state: "Pendiente"
        },
        {
          id: 10,
          number: "0123213-123123-123",
          created_at: new Date(),
          state: "Archivado"
        },
        {
          id: 11,
          number: "123213-123123-124",
          created_at: new Date(),
          state: "Archivado"
        },
        {
          id: 12,
          number: "123213-123123-125",
          created_at: new Date(),
          state: "Archivado"
        },
        {
          id: 13,
          number: "123213-123123-126",
          created_at: new Date(),
          state: "Archivado"
        },
        {
          id: 14,
          number: "123213-123123-127",
          created_at: new Date(),
          state: "Archivado"
        },
        {
          id: 15,
          number: "123213-123123-128",
          created_at: new Date(),
          state: "Archivado"
        },
        {
          id: 16,
          number: "123213-123123-129",
          created_at: new Date(),
          state: "Archivado"
        }
      ]
    };
  }
};
</script>

<style>
#ipps-list {
  background: #fff;
  height: 100%;
}

.list {
  padding: 0px;
}
</style>
