// Trip store prototype
import tripStorePrototype from 'assets/js/stores/trip-store-prototype.js';

function initShort () {
  let short = tripStorePrototype();
  short.namespaced = true;
  return short;
}

function initLong () {
  let long = tripStorePrototype();
  long.namespaced = true;
  return long;
}

export let mixin = {
  created () {
    this.$store.registerModule("shortSurveys", initShort());
    this.$store.registerModule("longSurveys", initLong());
  }
};
