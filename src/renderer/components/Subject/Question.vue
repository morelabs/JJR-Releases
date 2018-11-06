<template>
  <div
    :class="question.question.item_type"
    class="question-data">
    <el-row :gutter="20">
      <el-col :span="16">
        <label>{{ question.question.label }}</label>
      </el-col>
      <el-col :span="4">
        {{ question.answer.value || "S/D" }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    question: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {
    subjectType() {
      return `${this.subject.minor ? "Menor" : "Adulto"}`;
    },
    itemClass() {
      return {
        conclusion: this.question.question.item_type === "conclusion"
      };
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
