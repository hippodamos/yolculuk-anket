import TripOptions from "assets/js/trip-options.js";

function initStore() {
  let state = TripOptions();
  let mutations = {
    change (state, newState) {
      state = newState;
    }
  };

  return {
    state,
    mutations,
    namespaced: true
  };
}

export let mixin = {
  created () {
    this.$store.registerModule("tripOptions", initStore());
  }
};
