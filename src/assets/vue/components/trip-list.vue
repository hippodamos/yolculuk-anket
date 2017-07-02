<template lang="html">

  <f7-list media-list>
    <f7-list-item v-for="(trip, index) in trips"
      :key="index"
      :title="formatDate(trip.startDate)"
      :after="trip.startTime"
      :media="(index+1).toString()"
      :text="formatText(trip)"
      @click="$emit('tripSelect', index)"
      style="white-space: pre;">
    </f7-list-item>
  </f7-list>

</template>

<script>

export default {
  props: {
    trips: {
      type: Array,
      default: []
    },
    tripOptions: {
      type: Object,
      default: require('assets/js/trip-options.js')
    }
  },

  methods: {
    formatDate (date) {
			let d = new Date(date)
			let dayStr = d.toLocaleDateString(undefined, {weekday: "long"})
			return dayStr + ' ' + d.toLocaleDateString()
		},

    formatText (trip) {
      let text = "";
      if (trip.departureNode) text += this.tripOptions.tripNodes[trip.departureNode].name;
      if (trip.destinationNode) text += " -> " + this.tripOptions.tripNodes[trip.destinationNode].name;
      if (trip.mod) text += "\n" + this.tripOptions.tripMods[trip.mod].name;
      return text;
    },
  }
}
</script>

<style lang="css">
</style>
