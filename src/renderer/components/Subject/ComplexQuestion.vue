<template>
  <div>
    <el-row :gutter="20">
      <el-col
        v-for="(subquestion) in childQuestions"
        :span="bestSize"
        :key="subquestion.code"
        :ref="subquestion.code"
        class="subquestion_slot">
        <child-question
          :child="subquestion"
          :ipp-case-id="ippCaseId"
          :subject-id="subjectId"
          :answer-id="answer.id" />
      </el-col>
      <el-col :span="bestSize">
        <div style="margin-top: 26px;">
          <el-button
            :disabled="completed"
            type="primary"
            style="width: 100%"
            @click="addSubAnswer()">Agregar</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row
      v-for="(item, index) in answer.value.values"
      :gutter="20"
      :key="index">
      <el-col
        v-for="(value, key, index2) in item"
        :key="index2"
        :span="bestSize"
        style="border-bottom: solid 1px #eee;">
        <div style="padding: 5px 10px">{{ value }}</div>
      </el-col>
      <el-col :span="bestSize">
        <el-button
          type="info"
          size="small"
          plain
          style="width: 100%; margin-top: -5px;"
          @click.native.prevent="removeSubAnswer(index)">Quitar</el-button>
      </el-col>
    </el-row>
    <div style="margin-top: 10px;">
      <el-button
        v-if="modified"
        type="danger"
        style="width: 100%;"
        @click="saveAnswer()">Grabar</el-button>
    </div>
  </div>
</template>

<script>
import { clone, compact } from "lodash";
import ChildQuestion from "./ChildQuestion";

export default {
  name: "ComplexQuestion",
  components: { ChildQuestion },
  props: {
    childQuestions: {
      type: Array,
      required: true,
      default: () => []
    },
    answer: {
      type: Object,
      required: true,
      default: () => {}
    },
    ippCaseId: {
      type: Number,
      required: true
    },
    subjectId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      modified: false
    };
  },
  computed: {
    bestSize() {
      let col = Math.floor(24 / (this.childQuestions.length + 1));
      return col;
    },
    completed() {
      return (
        compact(this.childQuestions.map(child => !!child.value)).length !==
        this.childQuestions.length
      );
    }
  },
  methods: {
    addSubAnswer() {
      let newAnswer = {};
      this.childQuestions.forEach(child => {
        let child_value = clone(child.value);
        newAnswer[child.label] = child_value;
        child.value = null;
      });
      this.answer.value.values.push(newAnswer);
      this.modified = true;
    },
    removeSubAnswer(rowIndex) {
      this.answer.value.values.splice(rowIndex, 1);
      this.modified = true;
    },
    saveAnswer() {
      this.$emit("change");
      this.modified = false;
    }
  }
};
</script>

<style lang="css" scoped>
.question-data {
  /*border-top: solid 1px #eee;*/
  padding: 5px 0px;
}
</style>
