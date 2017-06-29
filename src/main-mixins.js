// Short and long surveys store
import {mixin as mainStoreMixin} from 'assets/js/stores/main-store.js';
//Trip Options store
import {mixin as tripOptionsStoreMixin} from 'assets/js/stores/trip-options-store.js';
//Trip Options store
import {mixin as userInfoStoreMixin} from 'assets/js/stores/user-info-store.js';

export default [
  mainStoreMixin,
  tripOptionsStoreMixin,
  userInfoStoreMixin
];
