<template>
  <div class="ipp-form-wrapper">
    <div class="ipp-form-container">
      <div class="ipp-step-header">
        <el-button
          type="primary"
          style="float: left"
          @click="goBack()">
          <fw-icon icon="chevron-left"/>
          Volver
        </el-button>
        Origen y usuarios
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
                style="width: 100%;">
                <el-option
                  v-for="item in allNotes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button @click="addNote()">Agregar</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="ipp.notes"
          style="100%">
          <el-table-column
            label="Nota"
            prop="name"/>
          <el-table-column>
            <template slot-scope="scope">
              <a
                href="#" 
                @click="removeNote(scope.row)"><i class="el-icon-delete"/></a>
            </template>
          </el-table-column>
        </el-table>
        <h3 style="margin-top: 40px">Asignados</h3>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item>
              <el-select
                v-model="newAssignee"
                clearable
                filterable
                placeholder="Seleccionar usuario"
                style="width: 100%;">
                <el-option
                  v-for="item in allUsers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.role }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button @click="addUser()">Agregar</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="ipp.assignees"
          style="100%">
          <el-table-column
            label="Nombre"
            prop="name"/>
          <el-table-column
            label="Rol"
            prop="role"/>
          <el-table-column>
            <template slot-scope="scope">
              <a
                href="#" 
                @click="removeUser(scope.row)"><i class="el-icon-delete"/></a>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      newNote: "",
      newAssignee: "",
      ipp: {
        assignees: [],
        notes: []
      },
      allNotes: [
        { id: 1, name: "Acordado" },
        { id: 2, name: "Probando" },
        { id: 3, name: "Otro tipo de acuerdo" }
      ],
      allUsers: [
        { id: 1, name: "Soledad Villamil", role: "Admin" },
        { id: 2, name: "Pedro Aznar", role: "Colaborador" },
        { id: 3, name: "Silvio Rodriguez", role: "Facilitador" },
        { id: 4, name: "Mauro Viale", role: "Abogado" }
      ]
    };
  },
  computed: {
    ...ippGetters(["ippFormSource"]),
    valid() {
      return this.ipp.notes.length > 0 && this.ipp.assignees.length > 0;
    }
  },
  created() {
    this.parseFromStorage();
  },
  methods: {
    ...ippActions(["setIppSource"]),
    parseFromStorage() {
      extend(this.ipp, this.ippFormSource);
    },
    goBack() {
      this.$emit("next", 4);
    },
    goNext() {
      if (this.valid) {
        this.setIppSource(this.ipp);
        this.$emit("next", 6);
      }
    },
    addNote() {
      let note = this.allNotes.find(n => this.newNote === n.id);
      this.ipp.notes.push(note);
      this.newNote = "";
    },
    removeNote(note) {
      const index = this.ipp.notes.indexOf(note);
      this.ipp.notes.splice(index, 1);
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
