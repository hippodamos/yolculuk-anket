<template lang="html">

  <f7-page>

    <f7-navbar :title="'Anketler'" back-link="Geri">
    </f7-navbar>

    <trip-current
                  :tripOptions="$store.state.tripOptions"
                  :currentTrip="$store.state[storeName].currentTrip"
                  @startTrip="$router.loadPage('/startTrip/'+storeName)"
                  @endTrip="$router.loadPage('/endTrip/'+storeName)">
    </trip-current>

    <trip-list
                :tripOptions="$store.state.tripOptions"
                :trips="$store.state[storeName].trips"
                @tripSelect="editTrip">
    </trip-list>

  </f7-page>

</template>

<script>
export default {
  data () {
    return {
      storeName: this.listName
    }
  },

  components: {
    "trip-current": require("assets/vue/components/trip-current.vue"),
    "trip-list": require("assets/vue/components/trip-list.vue")
  },

  props: {
    listName: String,
  },

  methods: {
    editTrip(payload) {
      this.$router.load({url:"/editTrip/"+this.storeName+"/"+payload})
    }
  },
}
</script>

<style lang="css">
</style>
