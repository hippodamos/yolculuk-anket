<template lang="html">

  <f7-page>
    <f7-navbar :title="'Yolculuk Ekle'" back-link="Geri">
    </f7-navbar>
    <trip-form
                :tripOptions="$store.state.tripOptions"
                :hide="storeName == 'longSurveys' ? [] : ['questions']"
                @formChange="formChange">
    </trip-form>
    <f7-list>
      <f7-list-button @click="saveTrip">Kaydet</f7-list-button>
      <f7-list-item divider></f7-list-item>
      <f7-list-button color="black" @click="$router.back()">İptal</f7-list-button>
    </f7-list>
  </f7-page>

</template>

<script>

export default {
  data: function() {
    return {
      formData: {},
      storeName: this.listName
    }
  },

  components: {
    'trip-form': require('assets/vue/components/trip-form.vue')
  },

  props: ['listName'],

  methods: {
    formChange(payload) {
      this.formData = payload;
    },

    saveTrip () {
      this.$store.commit(this.storeName + "/add", this.formData);
      this.$router.back();
    },
  },
}

</script>

<style lang="css">
</style>
