export default function () {
  return {
    state () {
      return {
        trips: [],
        currentTrip: null
      };
    },
    mutations: {
      add (state, trip) {
        state.trips.push(trip);
      },
      delete (state, index) {
        state.trips.splice(index, 1);
      },
      change (state, payload) {
        state.trips.splice(payload.index, 1, payload.trip);
      },
      clear (state) {
        state.trips.splice(0);
      },
      registerCurrentTrip (state, payload) {
        state.currentTrip = payload;
      }
    },
  };
}
