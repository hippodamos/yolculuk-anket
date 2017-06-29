<template lang="html">

  <f7-list media-list>
    <f7-list-item v-for="(trip, index) in trips"
      :key="index"
      :title="formatDate(trip.startDate)"
      :after="trip.startTime"
      :media="(index+1).toString()"
      :text="tripOptions.tripNodes[trip.departureNode] +	' -> ' + tripOptions.tripNodes[trip.destinationNode] + '\n' + tripOptions.tripMods[trip.mod]"
      @click="$emit('tripSelect', index)"
      style="white-space: pre;">
    </f7-list-item>
  </f7-list>

</template>

<script>
import tripOptionsDefault from 'assets/js/trip-options.js'

export default {
  props: {
    trips: {
      type: Array,
      default: []
    },
    tripOptions: {
      type: Object,
      default: tripOptionsDefault
    }
  },

  methods: {
    formatDate (date) {
			let d = new Date(date)
			let dayStr = d.toLocaleDateString(undefined, {weekday: "long"})
			return dayStr + ' ' + d.toLocaleDateString()
		},
  }
}
</script>

<style lang="css">
</style>
