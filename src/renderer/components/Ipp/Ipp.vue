<template>
  <div class="page">
    <div class="page-header">
      <div class="controls">
        <router-link :to="{ name: 'ipps' }">
          <el-button type="info">Volver</el-button>
        </router-link>
      </div>
      <h2>
        IPP - <span v-if="ipp.id">{{ "Nro." + ipp.ipp_number }}</span>
      </h2>
    </div>
    <div class="page-content no-bottom">
      <div class="list">
        <div class="ipp-top-info">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card class="box-card">
                <h4>Estado actual</h4>
                <p v-if="ipp.case_state">{{ ipp.case_state.name }}</p>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <h4>Proxima fecha importante</h4>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="ipp-content">
          <el-tabs
            v-model="activeName"
            :stretch="true">
            <el-tab-pane
              label="Victimarios"
              name="first">
              <ul>
                <li
                  v-for="(vict, index) in ipp.victimizers"
                  :key="index">
                  <victimizer
                    :victimizer="vict"
                    @open-modal="openModal(vict)" />
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane
              label="Victimas"
              name="second">
              <ul>
                <li
                  v-for="(vict, index) in ipp.victims"
                  :key="index">
                  <victim :victim="vict" />
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane
              label="Asignados"
              name="thirth">
              <ipp-case-responsables :ipp="ipp" />
            </el-tab-pane>
            <el-tab-pane
              label="Informacion"
              name="fourth">Otra informacion</el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <el-dialog
        v-if="selected.id"
        :visible.sync="isOpen"
        title="Editar Datos Personales">
        <div class="subject-content">
          <el-tabs
            v-model="personTabName"
            :stretch="true">
            <el-tab-pane
              label="Datos Personales"
              name="mfirst">
              <person
                :person="selected.person"
                @update-person="(data) => updatePerson(data)"/>
            </el-tab-pane>
            <el-tab-pane
              label="Contactos"
              name="msecond">
              <contacts
                :person="selected.person"
                @update-contacts="(data) => updateContacts(data)"/>
            </el-tab-pane>
            <el-tab-pane
              label="Responsables"
              name="mthird">
              <responsables
                :person="selected.person"
                @update-responsibles="(data) => updateResponsibles(data)"/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { filter } from "lodash";
import Victimizer from "./Sections/Victimizer";
import Victim from "./Sections/Victim";
import IppCaseResponsables from "./Sections/IppCaseResponsables";
import Contacts from "../Subject/Contacts";
import Responsables from "../Subject/Responsables";
import Person from "../Subject/Person";

import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: ippActions } = namespace("ipp");

export default {
  name: "Ipp",
  components: {
    Victimizer,
    Victim,
    IppCaseResponsables,
    Contacts,
    Responsables,
    Person
  },
  data() {
    return {
      loading: false,
      ipp: {},
      activeName: "first",
      personTabName: "mfirst",
      editAssigned: false,
      selected: {},
      isOpen: false
    };
  },
  computed: {
    victimizers() {
      if (this.ipp) {
        return filter(this.ipp.subjects, v => {
          return v.role === "victimizer";
        });
      } else {
        return [];
      }
    },
    victims() {
      if (this.ipp) {
        return filter(this.ipp.subjects, s => {
          return s.role === "victims";
        });
      } else {
        return [];
      }
    }
  },
  watch: {
    "$route.params.id": () => {
      this.loadIpp();
    }
  },
  created() {
    this.loadIpp();
  },
  methods: {
    ...ippActions(["fetchIpp"]),
    filter: filter,
    loadIpp() {
      this.loading = true;
      this.fetchIpp({ ippId: this.$route.params.id })
        .then(response => {
          this.ipp = response.ipp_case;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    openResponsablesModal() {
      this.editAssigned = true;
      this.modalComponent = IppCaseResponsables;
    },
    openModal(vict) {
      this.selected = vict;
      this.isOpen = true;
    },
    updatePerson(data) {
      console.log("New data", data);
      this.selected.person = data;
    },
    updateContacts(data) {
      this.selected.person.contacts = data;
    },
    updateResponsibles(data) {
      this.selected.person.responsibles = data;
    },
    printPerson() {
      console.log("Probando un emit");
    }
  }
};
</script>

<style lang="scss">
.el-tabs__item {
  font-size: 16px;
}
#ipps-data {
  background: #fff;
  height: 100%;
}
.ipp-top-info {
  margin: 10px 0px;
  border-bottom: solid 3px #eee;
  padding-bottom: 15px;
}
.ipp-top-info .box-card {
  height: 150px;
  text-align: left;
}
.ipp-top-info .box-card h4 {
  margin-top: 0px;
}
.ipp-content ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
.data {
  padding: 0px 20px;
}
.box-content {
  overflow: scroll;
  height: 100%;
}
.ipp-responsable {
  padding: 5px 0px;
  border-bottom: solid 1px #eee;
  margin-bottom: 5px;
  font-size: 15px;
}
.subject-content {
  .edit-buttons {
    text-align: right;
    font-size: 0.8rem;
    margin: 10px 0px;
    border-bottom: solid 1px #ddd;
    padding-bottom: 20px;
    a.save {
      color: #f56c6c;
      margin-left: 10px;
    }
    a.cancel,
    a.edit {
      color: #999;
    }
  }
  .person-data,
  .contacts-data {
    margin-bottom: 20px;
  }
  a {
    cursor: pointer;
  }
}
</style>
