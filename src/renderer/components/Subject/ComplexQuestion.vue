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
    <br>
    <el-row
      v-for="(item, index) in answer.value.values"
      :gutter="20"
      :key="index"
      class="value-row">
      <el-col
        v-for="(value, key, index2) in item"
        :key="index2"
        :span="bestSize">
        <div class="value-cell">{{ value }}</div>
      </el-col>
      <el-col :span="bestSize">
        <el-button
          type="info"
          size="small"
          plain
          class="value-cell-button"
          @click.native.prevent="removeSubAnswer(index)">Quitar</el-button>
      </el-col>
    </el-row>
    <div class="save-answer-button">
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

.value-row {
  border-bottom: solid 1px #eee;
  margin-bottom: 15px;
  padding-bottom: 10px;
}
.value-cell {
  padding: 5px 10px;
}
.value-cell-button {
  width: 100%;
  margin-top: -5px;
}
.save-answer-button {
  margin: 10px 0px;
}
</style>
