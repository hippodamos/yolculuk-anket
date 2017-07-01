function State () {
  return {
    name: null,
    surname: null,
    deviceCode: null
  };
}

export const storageName = 'userInfo';

function initStore() {
  let storage = localStorage.getItem(storageName);

  return {
    namespaced: true,
    state: storage ? JSON.parse(storage) : State,
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
    },
  };
}

export let mixin = {
  created () {
    this.$store.registerModule(storageName, initStore());
    this.$store.subscribe((mutation, state) => {
      if(mutation.type == 'userInfo/change') {
        localStorage.setItem(storageName, JSON.stringify(state.userInfo));
      }
    });
  }
};
