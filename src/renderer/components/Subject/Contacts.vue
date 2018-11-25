<template>
  <div class="contacts-data">
    <el-card class="box-card">
      <div slot="header">
        Contacto
        <div 
          v-show="isDisabled"
          class="edit-buttons">
          <a
            class="edit"
            @click="enableEdit()"><i class="el-icon-plus"></i> AGREGAR</a>
        </div>
        <div 
          v-show="!isDisabled"
          class="edit-buttons">
          <a
            class="cancel"
            @click="cancelEdit()">CANCELAR</a>
        </div>
      </div>
      <div v-if="!isDisabled">
        <el-form>
          <el-form-item>
            <el-row :gutter="10">
              <el-col :span="9">
                <el-select
                  v-model="newContact.contact_type"
                  size="small">
                  <el-option
                    label="Email"
                    value="email"/>
                  <el-option
                    label="Telefono"
                    value="telefono"/>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input
                  v-model="newContact.value"
                  size="small"
                  placeholder="Contacto"/>
              </el-col>
              <el-col :span="2">
                <el-button
                  type="primary"
                  size="small"
                  @click="saveContact()"><i class="el-icon-plus"></i></el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="contacts"
        style="widt: 100%;">
        <el-table-column width="50">
          <template slot-scope="scope">
            <a @click="deleteContact(scope.row)">
              <i class="el-icon-delete"></i>
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="contact_type"
          label="Tipo"/>
        <el-table-column
          prop="value"
          label="Contacto"/>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { clone } from "lodash";
import { createNamespacedHelpers as namespace } from "vuex";
const { mapActions: subjectActions } = namespace("person");

export default {
  name: "Contacts",
  props: {
    person: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      contacts: [],
      newContact: { contact_type: "", value: "" },
      isDisabled: true,
      removeContactModal: false
    };
  },
  created() {
    this.contacts = clone(this.person.contacts);
  },
  methods: {
    ...subjectActions(["addContact", "removeContact"]),
    enableEdit() {
      this.isDisabled = false;
    },
    cancelEdit() {
      this.newContact = { contact_type: "", value: "" };
      this.isDisabled = true;
    },
    saveContact() {
      let params = clone(this.newContact);
      this.addContact({ personId: this.person.id, params: params }).then(
        response => {
          this.contacts.push(response.contact);
          this.cancelEdit();
        }
      );
    },
    deleteContact(contact) {
      this.removeContact({
        personId: this.person.id,
        contactId: contact.id
      }).then(() => {
        let index = this.contacts.indexOf(contact);
        this.contacts.splice(index, 1);
      });
    }
  }
};
</script>

<style lang="scss">
.contacts-data {
  padding: 1rem;
  .el-form-item__label {
    text-align: left !important;
  }
}
</style>
