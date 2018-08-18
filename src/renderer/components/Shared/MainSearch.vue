<template>
  <el-dialog
    :visible.sync="showForm"
    title="Buscador Avanzado"
    width="40%">
    <div>
      <div style="color: #999;">
        Buscador avanzado. Seleccione un objeto para buscar y comience a escribir.
        Se mostrará un listado de sugestiones que podra clickear para abrirlo
      </div>
      <hr>
      <vue-simple-suggest
        ref="suggestions"
        :list="filterOptions"
        :destyled="true"
        :list-is-request="true"
        :styles="autoCompleteStyle">
        <el-input
          ref="searchSuggenstions"
          v-model="query"
          :placeholder="'Buscar ' + source + '...'"
          :disabled="!source"
          suffix-icon="el-icon-search"
          style="width: 100%;">
          <el-select
            slot="prepend"
            v-model="source"
            placeholder="Seleccionar..."
            style="width: 150px;"
            @change="updateInput()">
            <el-option
              value="ipp"
              label="IPP"/>
            <el-option
              value="expedientes"
              label="Expedientes"/>
            <el-option
              value="contacto"
              label="Contacto"/>
          </el-select>
        </el-input>
        <div
          v-if="loading"
          style="text-align: center; padding: 10px">
          <i class="el-icon-loading"></i> Buscando...
        </div>
        <div
          slot="suggestion-item"
          slot-scope="{ suggestion, query }">
          <div
            class="my-suggestion-list-item"
            @click="goToExpediente(suggestion)">
            Expediente: <span v-html="boldenSuggestion(suggestion, query)"></span>
            <div class="extra">Asigando a: {{ suggestion.assignees || 'pendiente' }}</div>
          </div>
        </div>
      </vue-simple-suggest>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "MainSearch",
  data() {
    return {
      showForm: false,
      loading: false,
      source: "expediente",
      query: "",
      autoCompleteStyle: {
        vueSimpleSuggest: "position-relative",
        inputWrapper: "el-input",
        defaultInput: "el-input__inner",
        suggestions: "my-suggestion-list",
        suggestionItem: "my-suggestion-list-item"
      },
      list: [
        {
          id: 1,
          value: "123123123123",
          assignees: "Juan, Pedro, Soledad"
        },
        {
          id: 2,
          value: "143123123123",
          assignees: ""
        },
        {
          id: 3,
          value: "153123123123",
          assignees: "Juan, Pedro, Soledad"
        },
        {
          id: 4,
          value: "173123123123",
          assignees: "Juan, Pedro, Soledad"
        },
        {
          id: 5,
          value: "1235123123123",
          assignees: ""
        }
      ]
    };
  },
  methods: {
    openSearch() {
      this.showForm = true;
      setTimeout(() => {
        let ref = this.$refs.searchSuggenstions;
        ref.focus();
      }, 100);
    },
    updateInput() {
      this.$refs.suggestions.research();
    },
    goToExpediente(selected) {
      this.showForm = false;
      this.$router.push({ name: "file", params: { id: selected.id } });
    },
    filterOptions(value) {
      return new Promise((resolve, reject) => {
        this.loading = true;
        setTimeout(() => {
          let result = this.list.filter(l => {
            return l.value.includes(value);
          });
          this.loading = false;
          resolve(result);
        }, 300);
      });
    },
    boldenSuggestion(suggestion, query) {
      return suggestion.value.replace(
        new RegExp("(.*?)(" + query + ")(.*?)", "gi"),
        "$1<b class='red'>$2</b>$3"
      );
    }
  }
};
</script>

<style>
.el-dialog__body {
  padding: 20px;
}

.my-suggestion-list {
  margin-top: 10px;
  font-size: 15px;
  background: #f0f0f0;
  color: #333;
  z-index: 1000;
  max-height: 400px;
  overflow-y: scroll;
}
.my-suggestion-list .my-suggestion-list-item {
  padding: 10px;
  margin: 0px;
}
.my-suggestion-list .my-suggestion-list-item:hover {
  background-color: #409eff;
  color: #fff;
}
.my-suggestion-list .my-suggestion-list-item:hover .extra,
.my-suggestion-list .my-suggestion-list-item:hover .red {
  color: #f9f9f9;
}
.my-suggestion-list .my-suggestion-list-item .extra {
  float: right;
  color: #999;
  margin-left: 5px;
}
.red {
  color: #f56c6c;
}
</style>
