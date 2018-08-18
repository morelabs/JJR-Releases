<template>
  <el-container
    style="height: 100%;">
    <el-aside
      width="15%"
      class="main-side-menu">
      <div class="user-info">
        <router-link :to="{ name: 'dashboard' }">
          <div class="image">
            <img src="@/assets/images/man.png">
          </div>
        </router-link>
        <div class="user-name">
          <div class="name">{{ user.first_name }} {{ user.last_name }}</div>
          <div style="padding-top: 5px;">
            <a
              href="#"
              class="logout"
              @click="closeSession()">Cerrar sesion</a>
          </div>
        </div>
      </div>
      <div
        class="search-form"
        @click="openSearchModal()">
        Buscador avanzado...
        <div style="float: right"><i class="el-icon-search"></i></div>
      </div>
      <br>
      <div class="menu-items">
        <h3><i class="icono-arg-justicia-negativo"></i> IPP</h3>
        <router-link
          :to="{ name: 'newIpp' }"
          class="menu-item">
          <span>Nuevo IPP</span>
        </router-link>
        <router-link
          :to="{ name: 'ipps' }"
          class="menu-item">
          <span>Listado de IPP</span>
        </router-link>
        <router-link
          :to="{ name: 'files' }"
          class="menu-item">
          <span>Expedientes</span>
        </router-link>
        <h3><i class="icono-arg-marcador-ubicacion-2"></i> Reportes</h3>
        <router-link
          :to="{ path: '/map/victimizers' }"
          class="menu-item">
          <span>Mapa Victimarios</span>
        </router-link>
        <router-link
          :to="{ path: '/report/origin' }"
          class="menu-item">
          <span>Estadisticas</span>
        </router-link>
        <br>
        <router-link
          :to="{ path: '/admin' }"
          class="menu-item dashboard admin">
          <i class="icono-arg-cambio-tecnologico"></i>
          <span>Administracion</span>
        </router-link>
      </div>
    </el-aside>
    <el-main class="jpj-main">
      <div class="jpj-main-inner">
        <transition
          name="slide-right"
          mode="out-in">
          <router-view/>
        </transition>
      </div>
      <el-dialog
        :visible.sync="showSearch"
        title="Buscador Avanzado"
        width="40%">
        <div>
          <vue-simple-suggest
            v-model="expediente"
            :list="filterOptions"
            :destyled="true"
            :list-is-request="true"
            :styles="autoCompleteStyle">
            <el-input
              ref="searchSuggenstions"
              :placeholder="'Buscar ' + source + '...'"
              suffix-icon="el-icon-search"
              style="width: 100%;">
              <el-select
                slot="prepend"
                v-model="source"
                placeholder="Seleccionar..."
                style="width: 150px;">
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
    </el-main>
  </el-container>
</template>

<script>
import { extend } from "lodash";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: authActions, mapGetters: authGetters } = namespace("auth");

export default {
  name: "Layout",
  data() {
    return {
      loading: false,
      showSearch: false,
      expediente: "",
      source: "expediente",
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
  computed: {
    ...authGetters(["user"])
  },
  created() {
    this.checkLogged();
  },
  methods: {
    ...authActions(["checkUser", "logout"]),
    checkLogged() {
      this.loading = true;
      this.checkUser()
        .then(response => {
          this.loading = false;
        })
        .catch(error => {
          this.$message.error(error);
          this.$router.push({ name: "login" });
        });
    },
    closeSession() {
      this.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    },
    goToExpediente(selected) {
      console.log(this.expediente);
      this.showSearch = false;
      this.expediente = "";
      this.$router.push({ name: "file", params: { id: selected.id } });
    },
    openSearchModal() {
      this.showSearch = true;
      setTimeout(() => {
        let ref = this.$refs.searchSuggenstions;
        ref.focus();
      }, 100);
    },
    filterOptions(value) {
      return new Promise((resolve, reject) => {
        this.loading = true;
        setTimeout(() => {
          let result = this.list.filter(l => {
            return l.value.match(value);
          });
          this.loading = false;
          resolve(result);
        }, 1000);
      });
    },
    boldenSuggestion(suggestion, query) {
      const texts = query.split(/[\s-_/\\|\.]/gm).filter(t => !!t) || [""];
      return suggestion.value.replace(
        new RegExp("(.*?)(" + texts.join("|") + ")(.*?)", "gi"),
        "$1<b class='red'>$2</b>$3"
      );
    }
  }
};
</script>

<style>
.jpj-main {
  display: flex;
  flex-direction: column;
  flex: auto;
}
.jpj-main .jpj-main-inner {
  margin: 0px 0px 16px 0px;
  flex: auto;
  background: rgb(255, 255, 255);
  position: relative;
  overflow: hidden scroll;
}
a {
  text-decoration: none;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}

.main-side-menu {
  background-color: rgb(51, 62, 76);
  color: rgb(201, 196, 200);
  padding: 10px 0px;
}
/* User info styles */
.user-info {
  padding: 10px;
  margin-bottom: 10px;
}
.user-info .image {
  text-align: center;
}
.user-info .image img {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: solid 1px #fff;
}
.user-info .user-name {
  margin: 5px 0px 5px 10px;
  text-align: center;
}

.user-info:hover {
  color: #fff;
}
.user-info .name {
  font-size: 18px;
}
.user-info .logout {
  color: #f56c6c;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}
/* Menu items styles */
.menu-items {
  margin: 20px 0px;
}
.menu-items a.menu-item {
  color: rgb(201, 196, 200);
  display: block;
  padding: 10px;
}
.menu-items a.menu-item:hover {
  background: rgb(103, 111, 122);
  color: #fff;
}
.menu-items a.menu-item.router-link-exact-active {
  background: rgb(112, 151, 196);
  color: #fff;
}

.menu-items a.menu-item.admin.router-link-exact-active,
.menu-items a.menu-item.admin.router-link-active {
  background: rgb(103, 111, 122);
  color: #fff;
}

.menu-items a.menu-item span {
  padding-left: 35px;
}
.menu-items h3 i,
.menu-items .menu-item.dashboard i {
  float: left;
  margin-right: 10px;
  margin-top: -2px;
  font-size: 17px;
}
.menu-items .menu-item.dashboard span {
  padding-left: 0px;
  font-size: 17px;
}
.menu-items .menu-item.dashboard {
  margin: 15px 0px;
  padding: 10px 0px 10px 10px;
}
.menu-items h3 {
  margin: 15px 0px;
  padding: 10px 0px 10px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 17px;
}
/* Search styles */
.search-form {
  padding: 10px;
  margin: 10px;
  background: rgb(103, 111, 122);
  border-color: transparent;
  color: #f0f0f0;
  border-radius: 5px;
}
.search-form input:focus,
.search-form input:active,
.search-form input:hover {
  border-color: transparent;
  outline: none;
  padding: 5px 10px;
}

.my-suggestion-list {
  margin-top: 10px;
  font-size: 15px;
  background: #f0f0f0;
  color: #333;
  z-index: 1000;
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

hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin: 40px 0px;
}

/* Page titles */
.page-header {
  height: 2em;
  line-height: 2em;
  border-bottom: solid 1px #f1f1f1;
  text-align: center;
  font-size: 20px;
  padding: 10px 20px;
}
</style>
