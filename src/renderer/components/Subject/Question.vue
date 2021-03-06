<template>
  <div
    v-show="show_component"
    :class="question.item_type"
    class="question-data">
    <el-row
      v-loading="loading"
      :gutter="20">
      <el-col :span="14">
        <label>{{ question.item_type == "data" ? `${question.item_number} - ` : null }} {{ question.label }}</label>
      </el-col>
      <el-col :span="10">
        <span v-if="editableQuestion">
          <el-select
            v-if="useMultipleSelect"
            v-model="answer.value"
            multiple
            placeholder="Seleccione"
            style="width: 100%"
            @change="update">
            <el-option
              v-for="item in question.options"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
          <el-select
            v-if="useSimpleSelect"
            v-model="answer.value"
            placeholder="Seleccione"
            style="width: 100%"
            @change="update">
            <el-option
              v-for="item in question.options"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
          <el-radio-group
            v-if="question.data_type == 'boolean'"
            v-model="answer.value"
            @change="update">
            <el-radio-button label="Si"/>
            <el-radio-button label="No"/>
          </el-radio-group>
          <el-input-number
            v-if="question.data_type == 'number'"
            v-model="answer.value"
            @change="update"/>
          <el-input
            v-if="question.data_type == 'string'"
            v-model="answer.value"
            clearable
            @change="update"/>
          <el-row
            v-if="useJsonTable"
            class="json-table">
            <complex-question
              :child-questions="question.child_questions"
              :answer="answer"
              :ipp-case-id="ippCaseId"
              :subject-id="subjectId"
              @change="update"
            />
          </el-row>
        </span>
        <span v-else>
          {{ answer.value || "S/D" }}
        </span>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import { clone } from "lodash";
import ComplexQuestion from "./ComplexQuestion";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: subjectActions } = namespace("subject");

export default {
  name: "Question",
  components: { ComplexQuestion },
  props: {
    question: {
      type: Object,
      required: true,
      default: () => {}
    },
    answer: {
      type: Object,
      required: true,
      default: () => {}
    },
    show: {
      type: Boolean,
      required: true,
      default: true
    },
    ippCaseId: {
      type: Number,
      required: true
    },
    subjectId: {
      type: Number,
      required: true
    },
    editable: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      original_value: null,
      show_component: false
    };
  },
  computed: {
    editableQuestion() {
      return this.editable;
    },
    useJsonTable() {
      return this.question.data_type == "json";
    },
    useSimpleSelect() {
      return (
        ["combo", "tag_list"].includes(this.question.data_type) &&
        !this.question.multiple
      );
    },
    useMultipleSelect() {
      return (
        ["combo", "tag_list"].includes(this.question.data_type) &&
        this.question.multiple
      );
    }
  },
  created() {
    this.show_component = clone(this.show);
    this.copyAnswer();
  },
  methods: {
    ...subjectActions(["updateAnswer"]),
    hideQuestion() {
      this.show_component = false;
    },
    showQuestion() {
      this.show_component = true;
    },
    copyAnswer() {
      this.original_value = clone(this.answer.value);
    },
    update() {
      this.loading = true;
      let answerId = this.answer.id;
      let payload = {
        data_type: this.question.data_type,
        value: this.answer.value
      };
      this.updateAnswer({ answerId, payload: payload })
        .then(response => {
          this.$notify.success({
            title: `Pregunta
              ${this.question.item_number || this.question.label}
            guardada`,
            duration: 1000
          });
          this.copyAnswer();
        })
        .catch(error => {
          this.$notify.error({
            title: `Error guardando`,
            message: error.response.data,
            duration: 0
          });
          this.answer.value = this.original_value;
        })
        .finally(() => {
          this.loading = false;
          this.toggleDependentQuestions();
        });
    },
    toggleDependentQuestions() {
      let question_ids = this.question.dependent_options.ids || [];
      let show = this.question.dependent_options[this.answer.value] || false;
      this.$emit("toggle", { ids: question_ids, show: show });
    }
  }
};
</script>

<style lang="css" scoped>
.question-data {
  border-top: solid 1px #eee;
  padding: 15px 0px;
}
.conclusion {
  font-weight: bold;
  text-transform: uppercase;
}
.conclusion label {
  color: #334EA1;
}
</style>
