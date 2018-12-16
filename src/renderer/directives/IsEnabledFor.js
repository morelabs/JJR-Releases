import store from "../store";

export const isEnabledFor = {
  bind: function(el, bindings) {
    let roles = bindings.value;
    let user = store.getters["auth/user"];
    console.log(user.jursidiction);
    if (
      user.jursidiction &&
      user.jursdiction.role &&
      roles.indexOf(user.jursidiction.role) === -1
    ) {
      el.style = "display: none";
      el.remove();
    }
  }
};
