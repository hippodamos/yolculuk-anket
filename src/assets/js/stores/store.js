import Vue from 'vue'
import Vuex from 'vuex'

const path = require('path')

Vue.use(Vuex)

import Trip from 'assets/js/trip.js'

// Look for stored trips
let tripsStore = localStorage.getItem("tripsStore")
let trips = tripsStore ? JSON.parse(tripsStore) : []

let currentTripStore = localStorage.getItem("currentTrip")
let currentTrip = currentTripStore ? JSON.parse(currentTripStore) : null

const state = {
  trips,
  currentTrip
}

const getters = {

}

const mutations = {
  add (state, payload) {
    if (payload) {
      state.trips.push(payload.trip)
    }
    else {
      let t = Trip()
      t.startDateTime = new Date().toDatetimeLocal()
      state.trips.push(t)
    }
  },
  delete (state, payload) {
    state.trips.splice(payload.index, 1)
  },
  edit (state, payload) {
    state.trips.splice(payload.index, 1, payload.trip)
  },
  clear (state, payload) {
    state.trips.splice(0)
  },

  startTrip (state, payload) {
    state.currentTrip = payload.trip
  },
  stopTrip (state, payload) {
    state.currentTrip = null
  }
}

const actions = {

}

const modules = {
  tripOptions: require("./trip-options-store.js")
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
