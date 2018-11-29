<template>
  <div
    v-loading="!subject.id"
    class="page subject" >
    <div v-if="subject.id">
      <div class="page-header">
        <router-link
          :to="{ name: 'ipp', params: { id: subject.ipp_case_id } }"
          style="float: left; margin: 5px 20px 5px 0px; font-size: 20px;"><i class="el-icon-back"></i></router-link>
        <h2>
          <span>IPP - Nro. {{ subject.ipp_case.ipp_number }}</span>
          -
          {{ fullname }}
          <span class="header-notification">{{ subject.inquiry_date || "Sin fecha de indagatoria" }}</span>
        </h2>
      </div>
      <div class="page-content no-bottom">
        <div class="list">
          <div class="ipp-content">
            <el-tabs 
              v-model="activeTabName"
              :stretch="true">
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
import { filter, map, clone } from "lodash";
import Question from "./Question";
import * as moment from "moment";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: subjectActions } = namespace("subject");

export default {
  name: "Subject",
  components: { Question },
  data() {
    return {
      loading: false,
      subject: {},
      activeTabName: "Datos Familiares",
      isOpen: false,
      dateFormat: "dddd dd, MMMM yyyy",
      isDisabled: true,
      originalPerson: {}
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
    ...subjectActions(["fetchSubject", "saveSubjectData"]),
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

<style lang="scss">
.subject {
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
    margin: 5px 20px 5px 0px;
    color: #f56c6c;
  }
}
</style>
