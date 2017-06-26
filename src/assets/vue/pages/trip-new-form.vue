<template>
  <f7-page>
    <f7-navbar title='Yeni Yolculuk' back-link="Geri">
      <f7-nav-right>
        <!-- <f7-button @click="saveTrip">Kaydet</f7-button> -->
      </f7-nav-right>
    </f7-navbar>
    <trip-form :tripOptions="this.tripOptions" :tripData="newTrip" ref="tripComp"></trip-form>
    <f7-list>
      <f7-list-button @click="saveTrip">Kaydet</f7-list-button>
      <f7-list-button color="red" @click="$router.back()">İptal</f7-list-button>
    </f7-list>
  </f7-page>
</template>
<script>
import tripOptions from "assets/json/trip-options.json"
import Trip from 'assets/js/trip.js'

export default {
  data: function() {
    return {
      tripOptions: require("assets/json/trip-options.json"),
    }
  },
  computed: {
    newTrip() {
      let t = Trip();
      let now = new Date()
      t.startDate = now.toString("yyyy-MM-dd")
      t.startTime = now.toString("HH:mm")

      return t
    },
  },
  components: {
    'trip-form': require('../components/trip-form.vue')
  },
  props: [],
  methods: {
    saveTrip () {
      this.$store.commit({
        type:"add",
        trip: this.$refs.tripComp.trip
      })
      this.$router.back()
    },
  },
}
</script>
