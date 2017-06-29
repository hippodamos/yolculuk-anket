<template lang="html">

  <f7-card class="survey-card">
    <f7-card-header>
      <span>{{ title }}</span>
       <f7-badge>{{ count }}</f7-badge>
    </f7-card-header>
    <f7-card-content>
      <f7-list accordion>
        <f7-list-item title="Aktif Yolculuk" accordion-item>
          <f7-accordion-content>
            <trip-current
                          :currentTrip="currentTrip"
                          @startTrip="$emit('startTrip')"
                          @stopTrip="$emit('stopTrip')">
            </trip-current>
          </f7-accordion-content>
        </f7-list-item>
        <f7-list-item title="Anketler" link="#" @click.stop="$emit('openSurveyList')"></f7-list-item>
      </f7-list>
    </f7-card-content>
  </f7-card>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Title"
    },
    count: {
      type: Number,
      default: 0
    },
    currentTrip: {
      type: Object,
      default: null
    }
  },

  components: {
    "trip-current": require("assets/vue/components/trip-current.vue"),
  }
}
</script>

<style lang="css">
</style>
