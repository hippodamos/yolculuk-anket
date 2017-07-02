<template>
  <f7-page>
    <f7-navbar title='Yeni Yolculuk Başlat' back-link="Geri">
      <f7-nav-right>
      </f7-nav-right>
    </f7-navbar>
    <trip-form
      :tripOptions="$store.state.tripOptions"
      :hide="['startDate', 'startTime', 'endDate', 'endTime', 'questions']"
      @formChange="formChange">
    </trip-form>
    <f7-list>
      <f7-list-button @click="startTrip">Başlat</f7-list-button>
      <f7-list-item divider></f7-list-item>
      <f7-list-button color="black" @click="$router.back()">İptal</f7-list-button>
    </f7-list>
  </f7-page>
</template>

<script>

export default {
  data: function() {
    return {
      formData: {}
    }
  },

  components: {
    'trip-form': require('../components/trip-form.vue')
  },

  props: ['storeName'],

  methods: {
    formChange(payload) {
      this.formData = payload;
    },

    startTrip () {
      let now = new Date();
      this.formData.startDate = now.toString("yyyy-MM-dd");
      this.formData.startTime = now.toString("HH:mm");
      this.$store.commit(this.storeName + "/registerCurrentTrip", this.formData);
      this.$router.back();
    },
  },
}

</script>
