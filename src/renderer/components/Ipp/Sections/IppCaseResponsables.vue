<template>
  <div style="margin: 10px 0px;">
    <h3 class="subtitle">Actualmente Asignados</h3>
    <div class="assigend-area">
      <div v-if="responsables.length > 0">
        <el-row
          v-for="responsable in responsables"
          :key="responsable.id"
          :gutter="20"
          class="ipp-responsable">
          <el-col :span="16">{{ responsable.name }}</el-col>
          <el-col
            :span="4"
            class="control">
            <el-tooltip content="Enviar un mail">
              <a :href="'mailto:' + responsable.email">
                <i class="el-icon-message"></i>
              </a>
            </el-tooltip>
          </el-col>
          <el-col
            :span="4"
            class="control">
            <el-tooltip content="Eliminar de este caso">
              <a
                href="#"
                @click="remove(responsable)"><i class="el-icon-delete"></i></a>
            </el-tooltip>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        No hay asignados todavia
      </div>
    </div>
    <div v-is-enabled-for="['admin', 'coordinador']">
      <h3 class="subtitle">Buscar usuarios</h3>
      <el-autocomplete
        v-model="criteria"
        :fetch-suggestions="querySearchAsync"
        :clearable="true"
        placeholder="Please input"
        style="width: 100%;"
        @select="assign">
        <template slot-scope="scope">
          {{ scope.item.name }} <span style="float: right;">{{ scope.item.email }}</span>
        </template>
      </el-autocomplete>
    </div>
  </div>
</template>

<script>
import { clone } from "lodash";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: userActions } = namespace("user");
const { mapActions: ippActions } = namespace("ipp");

export default {
  name: "IppCaseResponsables",
  props: {
    ipp: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      responsables: [],
      criteria: "",
      page: 1
    };
  },
  created() {
    this.responsables = clone(this.ipp.responsables || []);
  },
  methods: {
    ...userActions(["fetchUsers"]),
    ...ippActions(["addResponsable", "removeResponsable"]),
    assign(user) {
      this.loading = true;
      this.addResponsable({ ippId: this.ipp.id, userId: user.id })
        .then(response => {
          this.responsables.push(response["responsable"]);
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    remove(responsable) {
      this.loading = true;
      this.removeResponsable({
        ippId: this.ipp.id,
        responsableId: responsable.id
      })
        .then(() => {
          let index = this.responsables.indexOf(responsable);
          this.responsables.splice(index, 1);
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    querySearchAsync(queryString, cb) {
      this.criteria = queryString;
      if (this.criteria && this.criteria.length > 3) {
        this.fetchUsers({
          criteria: this.criteria,
          page: this.page
        })
          .then(response => {
            cb(response["users"]);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
hr {
  margin: 20px 0px;
}
.subtitle {
  background: #f1f1f1;
  padding: 10px 5px;
  text-align: left;
  margin-top: 0px;
}
.assigend-area {
  margin-bottom: 25px;
}
.ipp-responsable {
  margin: 10px 0px !important;
  padding-bottom: 10px;
  border-bottom: solid 1px #eee;
}
.ipp-responsable .el-col.control {
  text-align: right !important;
}
</style>
