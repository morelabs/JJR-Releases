<template>
  <div
    v-if="subject.id"
    class="page">
    <div class="page-header">
      <router-link
        :to="{ name: 'ipp', params: { id: subject.ipp_case_id } }"
        style="float: left; margin: 5px 20px 5px 0px; font-size: 20px;"><i class="el-icon-back"></i></router-link>
      <h2>
        IPP - Nro. {{ subject.ipp_case.ipp_number }} - 
        {{ fullname }} - {{ subject.role_name }} -
        {{ subjectType }} -
        {{ subject.inquiry_date || "Sin fecha de indagatoria" }}
      </h2>
    </div>
    <div class="page-content no-bottom">
      <div class="list">
        <div class="ipp-top-info">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-card class="box-card">
                <h4>Datos personales</h4>
                <p>Nombre: {{ fullname }}</p>
                <p>DNI: {{ subject.person.document_number }}</p>
                <p>Genero: {{ subject.person.gender == "Masc" ? "Masculino" : "Femenino" }}</p>
                <p>Nacimiento: {{ subject.person.birth_date | moment("DD MMMM, YYYY") }}</p>
                <p>Direccion: {{ subject.person.address }}</p>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="box-card">
                <h4>Datos de contacto</h4>
                <div
                  v-for="(item, index) in subject.person.contacts"
                  :key="index"
                  class="contact_slot">
                  <contact :contact="item"/>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="box-card">
                <h4>Responsables</h4>
                <div
                  v-for="(item, index) in subject.person.responsibles"
                  :key="index"
                  class="responsible_slot">
                  <responsible :responsible="item"/>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="ipp-content">
          <el-tabs 
            v-model="activeTabName"
            :stretch="true"
            @tab-click="handleClick">
            <el-tab-pane
              v-for="(category_data, i) in subject.file_data"
              :key="i"
              :label="i"
              :name="i">
              <div
                v-for="(subcategory_data, j) in category_data"
                :key="j">
                <h3>{{ j == "" ? i : j }}</h3>
                <div
                  v-for="(item, k) in subcategory_data.questions"
                  :key="k"
                  class="question_slot">
                  <question :question="item"/>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { filter } from "lodash";
import Contact from "./Contact";
import Responsible from "./Responsible";
import Question from "./Question";
import * as moment from "moment";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: subjectActions } = namespace("subject");

export default {
  name: "Subject",
  components: { Contact, Responsible, Question },
  data() {
    return {
      loading: false,
      subject: {},
      activeTabName: "Datos Familiares"
    };
  },
  computed: {
    fullname() {
      return `${this.subject.person.lastname},
        ${this.subject.person.firstname}`;
    },
    subjectType() {
      return `${this.subject.minor ? "Menor" : "Adulto"}`;
    }
  },
  created() {
    this.loadSubject();
  },
  methods: {
    ...subjectActions(["fetchSubject"]),
    filter: filter,
    loadSubject() {
      this.loading = true;
      this.fetchSubject({ subjectId: this.$route.params.id })
        .then(response => {
          this.subject = response.subject;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleClick(element, event) {
      //console.log("Selected", element, event);
    }
  }
};
</script>

<style scoped>
.ipp-top-info {
  margin: 10px 0px;
  border-bottom: solid 3px #eee;
  padding-bottom: 15px;
}
.ipp-top-info .box-card {
  min-height: 300px;
  overflow-y: scroll;
}
.ipp-top-info .box-card h4 {
  margin-top: 0px;
  padding-bottom: 10px;
  border-bottom: solid 1px #eee;
}
.ipp-content ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
</style>
