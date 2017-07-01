<template lang="html">

  <f7-page>

    <f7-navbar :title="'Anketler'" back-link="Geri">
    </f7-navbar>

    <trip-current
                  :tripOptions="$store.state.tripOptions"
                  :currentTrip="$store.state[listName].currentTrip"
                  @startTrip="$router.loadPage('/startTrip/'+listName)"
                  @endTrip="$router.loadPage('/endTrip/'+listName)">
    </trip-current>

    <trip-list
                :tripOptions="$store.state.tripOptions"
                :trips="$store.state[listName].trips">
    </trip-list>

  </f7-page>

</template>

<script>
export default {
  components: {
    "trip-current": require("assets/vue/components/trip-current.vue"),
    "trip-list": require("assets/vue/components/trip-list.vue")
  },

  props: {
    listName: String,
  },

  // TODO: Delete this before production
  created () {console.log(this)}
}
</script>

<style lang="css">
</style>
