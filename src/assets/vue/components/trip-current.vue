<template lang="html">
  <f7-block class="trip-current">
    <f7-list inset>
      <f7-list-group v-if="!currentTrip">
        <f7-list-button @click="$emit('startTrip')">Yeni Yolculuk Başlat</f7-list-button>
      </f7-list-group>
      <f7-list-group v-else>
        <f7-list-item>
          <f7-label>Başlangıç Zamanı</f7-label>
          <div class="dont-wrap">{{ currentTrip.startDate + '\n' + currentTrip.startTime }}</div>
        </f7-list-item>
        <f7-list-item>
          <!-- <div class="dont-wrap">{{ '• ' + tripOptions.tripNodes[currentTrip.departureNode].name+'\n'+'> ' + tripOptions.tripNodes[currentTrip.destinationNode].name }}</div> -->
          <f7-label>Güzergah</f7-label>
          <div class="nodes-container">
            <div class="node-name-container">
              <div v-if="currentTrip.departureNode" style="text-align:right">
                {{tripOptions.tripNodes[currentTrip.departureNode].name}}
              </div>
              <div v-if="currentTrip.destinationNode" style="text-align:right">
                {{tripOptions.tripNodes[currentTrip.destinationNode].name}}
              </div>
            </div>
            <div class="symbol-container">
              <div><f7-icon f7="flag"></f7-icon></div>
              <div><f7-icon f7="flag_fill"></f7-icon></div>
            </div>
          </div>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Ulaşım Türeli</f7-label>
          <div v-if="tripOptions.tripMods[currentTrip.mod]">
            {{ tripOptions.tripMods[currentTrip.mod].name }}
          </div>
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
	text-align:center;
}

.nodes-container {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
}

.symbol-container {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}
</style>
