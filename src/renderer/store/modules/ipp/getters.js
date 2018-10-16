const getters = {
  data: state => state.data,
  ippForm: state => state.form,
  ippFormBase: state => state.form.base,
  ippFormVictims: state => state.form.victims,
  ippFormVictimizers: state => state.form.victimizers,
  ippFormSource: state => state.form.source,
  ippFormPoliceStation: state => state.form.policeStation
};

export default getters;
