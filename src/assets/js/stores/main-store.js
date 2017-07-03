// Trip store prototype
import tripStorePrototype from 'assets/js/stores/trip-store-prototype.js';

export const shortStorageName = "shortSurveys";
export const longStorageName = "longSurveys";

function initShort () {
  let short = tripStorePrototype();
  let local = localStorage.getItem(shortStorageName);
  short.namespaced = true;
  if (local) short.state = JSON.parse(local);
  return short;
}

function initLong () {
  let long = tripStorePrototype();
  let local = localStorage.getItem(longStorageName);
  long.namespaced = true;
  if (local) long.state = JSON.parse(local);
  return long;
}

export let mixin = {
  created () {
    this.$store.registerModule(shortStorageName, initShort());
    this.$store.registerModule(longStorageName, initLong());
    this.$store.subscribe((mutation, state) => {
      if(mutation.type.startsWith(shortStorageName + '/')) {
        localStorage.setItem(shortStorageName, JSON.stringify(state[shortStorageName]));
      }
      else if(mutation.type.startsWith(longStorageName + '/')) {
        localStorage.setItem(longStorageName, JSON.stringify(state[longStorageName]));
      }
    });
  }
};
