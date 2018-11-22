<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col
            v-for="(subquestion) in childQuestions"
            :span="4"
            :key="subquestion.code"
            :ref="subquestion.code"
            class="subquestion_slot">
            <h5>{{ subquestion.label }}</h5>
            <el-input
              v-if="subquestion.data_type == 'string'"
              v-model="subquestion.value"
              clearable/>
            <el-select
              v-if="['combo', 'tag_list'].includes(subquestion.data_type)"
              v-model="subquestion.value"
              placeholder="Seleccione">
              <el-option
                v-for="item in subquestion.options"
                :key="item"
                :label="item"
                :value="item"/>
            </el-select>
            <el-select
              v-if="subquestion.data_type == 'sql_list'"
              v-model="subquestion.value"
              placeholder="Seleccione">
              <el-option
                v-for="item in getDynamicOptions(subquestion)"
                :key="item"
                :label="item"
                :value="item"/>
            </el-select>
          </el-col>
        </el-row>
        <el-button
          :disabled="completed"
          type="success"
          size="mini"
          round
          @click="addSubAnswer()">Agregar</el-button>
      </el-col>
      <el-col :span="12">
        <el-table
          :data="answer.value.values"
          style="width: 100%">
          <el-table-column
            v-for="(item, index) in childQuestions"
            :key="index"
            :prop="item.label"
            :label="item.label"
            width="150"/>
          <el-table-column
            label=""
            width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="removeSubAnswer(scope.$index)">Quitar</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          v-if="modified"
          type="success"
          round
          @click="saveAnswer()">Grabar</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { clone, compact } from "lodash";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: subjectActions } = namespace("subject");

export default {
  name: "ComplexQuestion",
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
    }
  },
  data() {
    return {
      modified: false
    };
  },
  computed: {
    completed() {
      return (
        compact(this.childQuestions.map(child => !!child.value)).length !==
        this.childQuestions.length
      );
    }
  },
  methods: {
    ...subjectActions(["getDynamicOptionList"]),
    getDynamicOptions(subquestion) {
      let answerId = this.answer.id;
      let options = [];
      this.getDynamicOptionList({ answerId, optionList: subquestion.options })
        .then(response => {
          //console.log("response", response);
          return response.data;
        })
        .catch(error => {
          console.log("error en getDynamicOptionList", error);
        });
    },
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
      console.log("answer", this.answer);
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
