<template lang="html">

  <f7-page>

    <f7-navbar :title="'Anketler'" back-link="Geri">
    </f7-navbar>

    <f7-block-title>Aktif Yolculuk</f7-block-title>
    <trip-current
                  :tripOptions="$store.state.tripOptions"
                  :currentTrip="$store.state[storeName].currentTrip"
                  @startTrip="$router.loadPage('/startTrip/'+storeName)"
                  @endTrip="$router.loadPage('/endTrip/'+storeName)">
    </trip-current>

    <f7-block-title>Yolculuk Listesi</f7-block-title>
    <trip-list
                :tripOptions="$store.state.tripOptions"
                :trips="$store.state[storeName].trips"
                @tripSelect="editTrip">
    </trip-list>

    <f7-fab-speed-dial>
      <f7-fab-actions>
        <f7-fab-action v-show="$store.state[storeName].trips.length > 0" @click="shareList"color="green" close-speed-dial><f7-icon f7="share"></f7-icon></f7-fab-action>
        <f7-fab-action v-show="$store.state[storeName].trips.length > 0" @click="cleanList" color="red" close-speed-dial><f7-icon f7="trash"></f7-icon></f7-fab-action>
        <f7-fab-action @click="$router.loadPage('addTrip/'+storeName)" close-speed-dial><f7-icon f7="add"></f7-icon></f7-fab-action>
      </f7-fab-actions>
      <f7-fab>
        <f7-icon f7="bars"></f7-icon>
        <f7-icon f7="close"></f7-icon>
      </f7-fab>
    </f7-fab-speed-dial>

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
    },

    cleanList() {
      this.$f7.confirm("Yolculuk listesindeki her şey silinecek", "Listeyi Temizle",
      () => {
        this.$store.commit(this.storeName+'/clear')
      })
    },

    shareList() {
			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, (de) => {
        let fileName = ""
        if (this.$store.state.userInfo) {
          fileName += this.$store.state.userInfo.name
          fileName += "_"
          fileName += this.$store.state.userInfo.surname
          fileName += "_"
          fileName += this.$store.state.userInfo.deviceCode
          fileName += "_"
        }
        if (this.storeName === "shortSurveys") fileName += "kısa_anketler.json"
        else fileName += "uzun_anketler.json"

				de.getFile(fileName, 	{create: true, exclusive: false}, (fe) => {
					fe.createWriter((fw) => {
						fw.write(new Blob([JSON.stringify(this.$store.state[this.storeName].trips)], {type: 'application/json'}))
						window.plugins.socialsharing.shareWithOptions({files: [fe.toURL()], subject:"Yolculuk Anket Listesi"})
					})
				})
			})
		}
  },
}
</script>

<style lang="css">
</style>
