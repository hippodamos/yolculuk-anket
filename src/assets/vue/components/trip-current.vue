<template lang="html">
  <f7-block class="trip-current">
    <f7-list inset>
      <f7-list-group v-if="!currentTrip">
        <f7-list-button @click="$emit('startTrip')">Yeni Yolculuk Başlat</f7-list-button>
      </f7-list-group>
      <f7-list-group v-else>
        <f7-list-item title="Başlangıç Zamanı:">
          <div class="dont-wrap">{{ currentTrip.startDate + '\n' + currentTrip.startTime }}</div>
        </f7-list-item>
        <f7-list-item title="Güzergah:">
          <div class="dont-wrap">{{ '• ' + tripOptions.tripNodes[currentTrip.departureNode].name+'\n'+'> ' + tripOptions.tripNodes[currentTrip.destinationNode].name }}</div>
        </f7-list-item>
        <f7-list-item title="Ulaşım Türeli:">
          {{ tripOptions.tripMods[currentTrip.mod] }}
        </f7-list-item>
        <f7-list-button color="red" @click="$emit('endTrip', currentTrip)">Yolculuğu Sonlandır</f7-list-button>
      </f7-list-group>
    </f7-list>
  </f7-block>
</template>

<script>
import tripOptionsDefault from 'assets/js/trip-options.js'

export default {
  props: {
    currentTrip: {
      type: Object,
      default: null
    },
    tripOptions: {
      type: Object,
      default: tripOptionsDefault
    }
  }
}
</script>

<style lang="css">
.dont-wrap {
	white-space:pre;
	text-align:center
}
</style>
