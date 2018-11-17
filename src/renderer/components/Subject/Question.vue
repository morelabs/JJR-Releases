<template>
  <div
    :class="question.item_type"
    class="question-data">
    <el-row
      v-loading="loading"
      :gutter="20">
      <el-col :span="16">
        <label>{{ question.label }}</label>
      </el-col>
      <el-col :span="4">
        <span v-if="editableQuestion()">
          <el-select
            v-if="useMultipleSelect"
            v-model="answer.value"
            multiple
            placeholder="Seleccione"
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
            size="small"
            @change="update">
            <el-radio-button label="Si"/>
            <el-radio-button label="No"/>
          </el-radio-group>
          <el-input-number
            v-if="question.data_type == 'number'"
            v-model="answer.value"
            @change="update"/>
          <span v-if="dontRender">
            tipo {{ question.data_type }}
          </span>
        </span>
        <span v-else>
          {{ answer.value || "S/D" }}
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: subjectActions } = namespace("subject");

export default {
  name: "Question",
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
    editable: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      original_value: null
    };
  },
  computed: {
    dontRender() {
      return (
        this.question.data_type != "combo" &&
        this.question.data_type != "tag_list" &&
        this.question.data_type != "boolean" &&
        this.question.data_type != "number"
      );
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
    this.copyAnswer();
  },
  methods: {
    ...subjectActions(["updateAnswer"]),
    editableQuestion() {
      return this.editable;
    },
    copyAnswer() {
      this.original_value = this.answer.value;
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
            title: `Dato guardado`,
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
        });
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
