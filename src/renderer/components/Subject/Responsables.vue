<template>
  <div class="responsables-data">
    <el-card class="box-card">
      <div slot="header">
        Responsables
        <div 
          v-show="isDisabled"
          class="edit-buttons">
          <a
            class="edit"
            @click="enableEdit()"><i class="el-icon-plus"></i> AGREGAR</a>
        </div>
        <div 
          v-show="!isDisabled"
          class="edit-buttons">
          <a
            class="cancel"
            @click="cancelEdit()">CANCELAR</a>
        </div>
      </div>
      <div v-if="!isDisabled">
        <el-form ref="form">
          <el-form-item>
            <el-row :gutter="10">
              <el-col :span="6">
                <el-select
                  v-model="newResponsible.bond"
                  :readonly="isDisabled"
                  size="small">
                  <el-option
                    label="Padre"
                    value="padre"/>
                  <el-option
                    label="Madre"
                    value="madre"/>
                  <el-option
                    label="Tutor"
                    value="tutor"/>
                </el-select>
              </el-col>
              <el-col :span="18">
                <el-input
                  v-model="newResponsible.full_name"
                  :readonly="isDisabled"
                  size="small"
                  placeholder="Nombre Completo"/>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="10">
              <el-col :span="6">
                <el-input
                  v-model="newResponsible.phone"
                  :readonly="isDisabled"
                  size="small"
                  placeholder="Telefono"/>
              </el-col>
              <el-col :span="15">
                <el-input
                  v-model="newResponsible.address"
                  :readonly="isDisabled"
                  size="small"
                  placeholder="Direccion"/>
              </el-col>
              <el-col :span="3">
                <el-button
                  type="primary"
                  size="small"
                  style="width: 100%;"
                  @click="saveResponsible()"><i class="el-icon-plus"></i></el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="responsibles"
        style="width: 100%">
        <el-table-column width="50">
          <template slot-scope="scope">
            <a @click="deleteResponsible(scope.row)">
              <i class="el-icon-delete"></i>
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="bond"
          label="Relacion"/>
        <el-table-column
          prop="full_name"
          label="Nombre"/>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <p>Telefono: {{ scope.row.phone }}</p>
            <p>Direccion: {{ scope.row.address }}</p>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { clone } from "lodash";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: subjectActions } = namespace("person");

export default {
  name: "Responsible",
  props: {
    person: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      responsibles: [],
      isDisabled: true,
      newResponsible: {}
    };
  },
  created() {
    this.responsibles = clone(this.person.responsibles);
  },
  methods: {
    ...subjectActions(["addResponsible", "removeResponsible"]),
    enableEdit() {
      this.isDisabled = false;
    },
    cancelEdit() {
      this.newContact = { contact_type: "", value: "" };
      this.isDisabled = true;
    },
    saveResponsible() {
      let params = clone(this.newResponsible);
      this.addResponsible({ personId: this.person.id, params: params }).then(
        response => {
          this.responsibles.push(response.responsible);
          this.cancelEdit();
        }
      );
    },
    deleteResponsible(responsible) {
      this.removeResponsible({
        personId: this.person.id,
        responsibleId: responsible.id
      }).then(() => {
        let index = this.responsibles.indexOf(responsible);
        this.responsibles.splice(index, 1);
      });
    }
  }
};
</script>

<style lang="css" scoped>
.responsables-data {
  padding: 1rem;
}
</style>
