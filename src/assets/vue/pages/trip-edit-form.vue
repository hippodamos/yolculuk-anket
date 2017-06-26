<template>
  <f7-page>
    <f7-navbar :title="'Yolculuk: ' + (parseInt(tripIndex)+1)" back-link="Geri">
      <f7-nav-right>
        <!-- <f7-button @click="saveTrip">Kaydet</f7-button> -->
      </f7-nav-right>
    </f7-navbar>
    <trip-form :tripOptions="this.tripOptions" :tripData="$store.state.trips[tripIndex]" ref="tripComp"></trip-form>
    <f7-list>
      <f7-list-button @click="saveTrip">Kaydet</f7-list-button>
      <f7-list-button color="red" @click="$router.back()">İptal</f7-list-button>
    </f7-list>
  </f7-page>
</template>
<script>
import tripOptions from "assets/json/trip-options.json"

export default {
  data: function() {
    return {
      tripOptions: require("assets/json/trip-options.json"),
    }
  },
  components: {
    'trip-form': require('../components/trip-form.vue')
  },
  props: ['tripIndex'],
  methods: {
    saveTrip () {
      this.$store.commit({
        type:"edit",
        index: this.tripIndex,
        trip: this.$refs.tripComp.trip
      })
      this.$router.back()
    },
  },
}
</script>
