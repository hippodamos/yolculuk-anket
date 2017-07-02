<template>
  <f7-page>
    <f7-navbar :title="'Yolculuk: ' + (parseInt(tripIndex)+1)" back-link="Geri">
    </f7-navbar>
    <trip-form
                :tripOptions="$store.state.tripOptions"
                :initialData="formData"
                :hide="storeName == 'longSurveys' ? [] : ['questions']"
                @formChange="formChange">
    </trip-form>
    <f7-list>
      <f7-list-button @click="saveTrip">Kaydet</f7-list-button>
      <f7-list-button color="red" @click="deleteTrip">Sil</f7-list-button>
      <f7-list-item divider></f7-list-item>
      <f7-list-button color="black" @click="$router.back()">İptal</f7-list-button>
    </f7-list>
  </f7-page>
</template>
<script>
import tripOptions from "assets/json/trip-options.json"

export default {
  data: function() {
    let trip = JSON.parse(JSON.stringify(
      this.$store.state[this.storeName].trips[this.tripIndex]));

    return {
      formData: trip || {}
    };
  },
  components: {
    'trip-form': require('assets/vue/components/trip-form.vue')
  },
  props: ['tripIndex', 'storeName'],
  methods: {
    formChange(payload) {
      this.formData = payload;
    },

    deleteTrip() {
      this.$store.commit(this.storeName + "/delete", this.tripIndex);
      this.$router.back();
    },

    saveTrip () {
      this.$store.commit(this.storeName + "/change",
        {trip: this.formData,
        index: this.tripIndex});
      this.$router.back();
    },
  },
}
</script>
