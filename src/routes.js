export default [
  {
    path: '/surveyList/:listName',
    component: require('./assets/vue/pages/survey-list.vue')
  },
  {
    path: '/startTrip/:storeName',
    component: require('./assets/vue/pages/trip-start.vue')
  },
  {
    path: '/endTrip/:storeName',
    component: require('./assets/vue/pages/trip-end.vue')
  },
];
