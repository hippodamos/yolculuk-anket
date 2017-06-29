function State () {
  return {
    name: null,
    surname: null,
    deviceCode: null
  };
}

function initStore() {
  return {
    namespaced: true,
    state: State,
    mutations: {
      change (state, payload) {
        if (payload.name) {
          state.name = payload.name;
        }
        if (payload.surname) {
          state.surname = payload.surname;
        }
        if (payload.deviceCode) {
          state.deviceCode = payload.deviceCode;
        }
      }
    }
  };
}

export let mixin = {
  created () {
    this.$store.registerModule('userInfo', initStore());
  }
};
