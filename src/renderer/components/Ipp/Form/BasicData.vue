<template>
  <div>
    <div class="ipp-form-container">
      <div class="ipp-step-header">
        Informacion Inicial
        <el-button
          :disabled="!valid"
          type="primary"
          style="float: right"
          @click="goNext()">
          Siguiente
          <fw-icon icon="chevron-right"/>
        </el-button>
      </div>
      <div class="ipp-step-inner">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item>
              <el-input
                v-model="ipp.number"
                name="number"
                style="width: 100%;"
                placeholder="Numero: XX-XX-XXXX-XX"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item>
              <el-date-picker
                v-model="ipp.commited_at"
                :clearable="true"
                :disabled="ipp.commitedAtDisabled"
                format="dd/MM/yyyy"
                style="width: 100%;"
                name="commited_at"
                placeholder="Fecha del hecho"/>
              <div>
                <el-checkbox
                  v-model="ipp.commitedAtDisabled"
                  label="Fecha desconocida"
                  @change="cleanDate('commited_at')"/>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-date-picker
                v-model="ipp.reported_at"
                :clearable="true"
                :disabled="ipp.reportedAtDisabled"
                format="dd/MM/yyyy"
                style="width: 100%;"
                name="commited_at"
                placeholder="Fecha de la denuncia"/>
              <div>
                <el-checkbox
                  v-model="ipp.reportedAtDisabled"
                  label="Fecha desconocida"
                  @change="cleanDate('reported_at')"/>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <h3 style="margin-top: 20px">Origen</h3>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item>
              <el-select
                v-model="ipp.source.id"
                clearable
                filterable
                placeholder="Seleccionar origen"
                style="width: 100%;">
                <el-option
                  v-for="item in allSources"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.city }}</span>
                </el-option>  
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-select
                v-model="ipp.state"
                :disabled="ipp.archived"
                clearable
                filterable
                placeholder="Seleccionar estado"
                style="width: 100%;">
                <el-option
                  v-for="item in allStates"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"/>
              </el-select>
              <div>
                <el-checkbox v-model="ipp.archived">Archivado?</el-checkbox>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { extend } from "lodash";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapGetters: ippGetters, mapActions: ippActions } = namespace("ipp");

export default {
  name: "BasicData",
  data() {
    return {
      ipp: {
        number: "",
        commited_at: "",
        reported_at: "",
        total_involved: 1,
        reportedAtDisabled: false,
        commitedAtDisabled: false,
        archived: false,
        source: { id: "", name: "" },
        state: ""
      },
      allSources: [
        { id: 1, name: "Fiscalia 1", city: "San Isidro" },
        { id: 2, name: "Fiscalia 2", city: "San Isidro" },
        { id: 3, name: "Fiscalia 3", city: "San Isidro" },
        { id: 4, name: "Fiscalia 4", city: "San Isidro" },
        { id: 5, name: "Fiscalia 5", city: "San Isidro" }
      ],
      allStates: [
        { id: 1, name: "En curso" },
        { id: 2, name: "Probation" },
        { id: 3, name: "Alegatos" }
      ]
    };
  },
  computed: {
    ...ippGetters(["ippFormBase"]),
    valid() {
      return this.ipp.number && this.ipp.total_involved > 0;
    }
  },
  created() {
    this.parseFromStorage();
  },
  methods: {
    ...ippActions(["setIppBase"]),
    parseFromStorage() {
      extend(this.ipp, this.ippFormBase);
    },
    goNext() {
      if (this.valid) {
        this.setIppBase(this.ipp);
        this.$emit("next", 2);
      }
    },
    cleanDate(field) {
      if (field == "commited_at") {
        this.ipp[field] = this.ipp.commitedAtDisabled ? "" : this.ipp[field];
      } else if (field == "reported_at") {
        this.ipp[field] = this.ipp.reportedAtDisabled ? "" : this.ipp[field];
      }

      console.log(field, this.ipp[field]);
    },
    setSource(val) {
      this.ipp.source = this.allSources.find(s => val === s.id);
    }
  }
};
</script>
