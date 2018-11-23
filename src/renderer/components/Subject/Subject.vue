<template>
  <div
    v-loading="!subject.id"
    class="page" >
    <div v-if="subject.id">
      <el-aside
        :class="isOpen ? 'not-collapsed' : 'collapsed'"
        class="subject-aside">
        <div class="subject-aside-header">
          <a @click="isOpen = !isOpen"><i class="el-icon-close"></i></a>
          <h2>Datos del sujeto</h2>
        </div>
        <div class="subject-aside-content">
          <el-card class="box-card">
            <div slot="header">Datos personales</div>
            <p>Nombre: {{ fullname }}</p>
            <p>DNI: {{ subject.person.document_number }}</p>
            <p>Genero: {{ gender }}</p>
            <p>Nacimiento: {{ subject.person.birth_date | moment("DD MMMM, YYYY") }}</p>
            <p>Direccion: {{ subject.person.address }}</p>
          </el-card>
          <hr>
          <el-card class="box-card">
            <div slot="header">Datos de contacto</div>
            <div
              v-for="(item, index) in subject.person.contacts"
              :key="index"
              class="contact_slot">
              <contact :contact="item"/>
            </div>
          </el-card>
          <hr>
          <el-card class="box-card">
            <div slot="header">Responsables</div>
            <div
              v-for="(item, index) in subject.person.responsibles"
              :key="index"
              class="responsible_slot">
              <responsible :responsible="item"/>
            </div>
          </el-card>
        </div>
      </el-aside>
      <div
        :class="isOpen ? 'backdrop': ''"
        @click="isOpen = !isOpen"></div>
      <div class="page-header">
        <router-link
          :to="{ name: 'ipp', params: { id: subject.ipp_case_id } }"
          style="float: left; margin: 5px 20px 5px 0px; font-size: 20px;"><i class="el-icon-back"></i></router-link>
        <h2>
          <span>IPP - Nro. {{ subject.ipp_case.ipp_number }} -  {{ fullname }}</span>
          <span class="header-toggle"><a @click="isOpen = !isOpen"><i class="el-icon-arrow-left"></i></a></span>
          <span class="header-notification">{{ subject.inquiry_date || "Sin fecha de indagatoria" }}</span>
        </h2>
      </div>
      <div class="page-content no-bottom">
        <div class="list">
          <div class="ipp-content">
            <el-tabs 
              v-model="activeTabName"
              :stretch="true"
              @tab-click="handleClick">
              <el-tab-pane
                v-for="(category_data, category_name, category_index) in subject.file_data"
                :key="category_index"
                :label="category_name"
                :name="category_name">
                <div
                  v-for="(subcategory_data, subcategory_name, subcategory_index) in category_data"
                  :key="subcategory_index">
                  <h3>{{ subcategory_name.trim() == "" ? category_name : subcategory_name }}</h3>
                  <div
                    v-for="(item, item_key) in subcategory_data.questions"
                    :key="item_key"
                    class="question_slot">
                    <question
                      :ref="`question_${item.code}`"
                      :class="`question_${item.code}`"
                      :show="item.show"
                      :question="item.question"
                      :answer="item.answer"
                      :editable="subject.editable"
                      :subject-id="subject.id"
                      :ipp-case-id="subject.ipp_case_id"
                      @toggle="toggleQuestionComponent($event)"/>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { filter, map } from "lodash";
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
      activeTabName: "Datos Familiares",
      isOpen: false
    };
  },
  computed: {
    fullname() {
      return `${this.subject.person.lastname},
        ${this.subject.person.firstname}`;
    },
    gender() {
      let gender = "";
      if ((this.subject.person.gender || "") != "") {
        gender =
          this.subject.person.gender == "Masc" ? "Masculino" : "Femenino";
      }
      return gender;
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
    },
    toggleQuestionComponent(data) {
      let _this = this;
      map(data.ids, questionId => {
        let q = _this.$refs[`question_${questionId}`][0];
        if (data.show) {
          q.showQuestion();
        } else {
          q.hideQuestion();
        }
      });
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
.header-notification {
  float: right;
  margin: 5px 30px 5px 0px;
  color: #f56c6c;
}
.header-toggle {
  float: right;
  margin: 5px 25px;
  font-size: 30px;
  font-weight: bold;
}
.subject-aside {
  display: none;
  height: 100%;
  background: #fff;
  color: #333;
  z-index: 10002;
  width: 500px !important;
  right: 0px;
  position: absolute;
  border-left: solid 1px #eee;
}
.subject-aside.collapsed {
  display: none;
}

.subject-aside.not-collapsed {
  display: block;
}
.subject-aside .subject-aside-header {
  border-bottom: solid 1px #eee;
  height: 4rem;
  line-height: 4rem;
  padding: 10px 0px;
}
.subject-aside .subject-aside-content {
  padding: 20px;
}
.subject-aside .subject-aside-header h2 {
  margin: 5px 20px;
}
.subject-aside .subject-aside-header a {
  float: right;
  font-size: 30px;
  margin: 5px 20px;
}

.backdrop {
  position: absolute;
  z-index: 1001;
  height: 100%;
  background: #333;
  width: 100%;
  opacity: 0.7;
}
</style>
