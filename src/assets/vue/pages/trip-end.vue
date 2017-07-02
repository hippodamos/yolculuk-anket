<template>
  <f7-page>
    <f7-navbar title='Yolculuğu Sonlandır' back-link="Geri">
      <f7-nav-right>
      </f7-nav-right>
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

export default {
  data: function() {
    let now = new Date()
    let currentTrip = JSON.parse(JSON.stringify(
      this.$store.state[this.storeName].currentTrip));
    currentTrip.endDate = now.toString("yyyy-MM-dd");
    currentTrip.endTime = now.toString("HH:mm");

    return {
      formData: currentTrip || {}
    }
  },

  components: {
    'trip-form': require('assets/vue/components/trip-form.vue')
  },

  props: ['storeName'],

  methods: {
    formChange(payload) {
      this.formData = payload;
    },

    deleteTrip() {
      this.$store.commit(this.storeName + "/registerCurrentTrip", null);
      this.$router.back();
    },

    saveTrip () {
      this.$store.commit(this.storeName + "/add", this.formData);
      this.$store.commit(this.storeName + "/registerCurrentTrip", null);
      this.$router.back();
    },
  },
}
</script>
