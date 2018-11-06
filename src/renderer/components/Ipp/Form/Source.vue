<template>
  <div class="ipp-form-container">
    <div class="ipp-step-header">
      <el-button
        type="primary"
        style="float: left"
        @click="goBack()">
        <fw-icon icon="chevron-left"/>
        Volver
      </el-button>Origen y usuarios
      <el-button
        :disabled="!valid"
        type="primary"
        style="float: right" 
        @click="goNext()">
        Siguiente
        <fw-icon icon="chevron-right"/>
      </el-button>
    </div>
    <div class="ipp-step-inner">
      <h3>Observaciones</h3>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item>
            <el-select
              v-model="newNote"
              clearable
              filterable
              placeholder="Seleccionar nota"
              style="width: 100%;"
              @change="addNote">
              <el-option
                v-for="(item, index) in observations"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table 
        :data="ippFormSource.observations" 
        style="100%">
        <el-table-column>
          <template slot-scope="scope">{{ scope.row }}</template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <a 
              href="#" 
              @click="removeNote(scope.row)">
              <i class="el-icon-delete"/>
            </a>
          </template>
        </el-table-column>
      </el-table>
      <h3 style="margin-top: 50px;">Definicion</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item>
            <el-select
              v-model="newDefinition"
              clearable
              filterable
              placeholder="Seleccionar"
              style="width: 100%;"
              @change="setDefinition"
            >
              <el-option
                v-for="(item, index) in data.definitions"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { extend, clone } from "lodash";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: ippGetters, mapActions: ippActions } = namespace("ipp");

export default {
  name: "PeopleInvolved",
  data() {
    return {
      newNote: {},
      newAssignee: {},
      newDefinition: "",
      observations: [],
      allUsers: [
        { id: 1, name: "Soledad Villamil", role: "Admin" },
        { id: 2, name: "Pedro Aznar", role: "Colaborador" },
        { id: 3, name: "Silvio Rodriguez", role: "Facilitador" },
        { id: 4, name: "Mauro Viale", role: "Abogado" }
      ]
    };
  },
  computed: {
    ...ippGetters(["ippFormSource", "data"]),
    valid() {
      return this.ippFormSource.definition;
    }
  },
  created() {
    this.newDefinition = clone(this.ippFormSource.definition);
    this.observations = clone(this.data.observations);
  },
  methods: {
    ...ippActions([
      "setIppSource",
      "addObservation",
      "removeObservation",
      "addDefinition",
      "removeDefinition"
    ]),
    goBack() {
      this.$emit("next", 3);
    },
    goNext() {
      if (this.valid) {
        this.$emit("next", 5);
      }
    },
    setDefinition(val) {
      if (val.toString().trim()) {
        this.addDefinition({ definition: val });
      } else {
        this.removeDefinition();
      }
    },
    addNote() {
      this.addObservation({ observation: this.newNote }).then(() => {
        let indx = this.observations.indexOf(this.newNote);
        this.observations.splice(indx, 1);
        this.newNote = "";
      });
    },
    removeNote(note) {
      this.removeObservation({ observation: note });
      _.sortBy(this.observations.push(note), n => n);
    },
    addUser() {
      let user = this.allUsers.find(u => u.id === this.newAssignee);
      this.ipp.assignees.push(user);
      this.newAssignee = "";
    },
    removeUser(user) {
      let index = this.ipp.assignees.indexOf(user);
      this.ipp.assignees.splice(index, 1);
    }
  }
};
</script>
