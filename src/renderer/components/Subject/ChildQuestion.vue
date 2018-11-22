<template>
  <div style="margin: 0px 0px">
    <div style="margin-bottom: 10px;">{{ child.label }}</div>
    <el-input
      v-if="child.data_type == 'string'"
      v-model="child.value"
      clearable/>
    <el-select
      v-if="['combo', 'tag_list'].includes(child.data_type)"
      v-model="child.value"
      placeholder="Seleccione">
      <el-option
        v-for="item in child.options"
        :key="item"
        :label="item"
        :value="item"/>
    </el-select>
    <el-select
      v-if="child.data_type == 'sql_list'"
      v-model="child.value"
      placeholder="Seleccione">
      <el-option
        v-for="item in values"
        :key="item"
        :label="item"
        :value="item"/>
    </el-select>
  </div>
</template>

<script>
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: subjectActions } = namespace("subject");
export default {
  name: "ChildQuestion",
  props: {
    child: {
      type: Object,
      required: true
    },
    answerId: {
      type: Number,
      required: true
    },
    subjectId: {
      type: Number,
      required: true
    },
    ippCaseId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      values: []
    };
  },
  created() {
    if (this.child.data_type == "sql_list") {
      this.getDynamicOptions();
    }
  },
  methods: {
    ...subjectActions(["getDynamicOptionList"]),
    getDynamicOptions() {
      this.getDynamicOptionList({
        answerId: this.answerId,
        subjectId: this.subjectId,
        ippCaseId: this.ippCaseId,
        optionList: this.child.options
      })
        .then(response => {
          // console.log("response", this.child.label, response);
          this.values = response.data;
        })
        .catch(error => {
          console.log("error en getDynamicOptionList", error);
        });
    }
  }
};
</script>
