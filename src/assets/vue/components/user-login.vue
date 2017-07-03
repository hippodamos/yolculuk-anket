<template lang="html">

  <f7-login-screen @loginscreen:open="init()">
    <f7-view>
      <f7-pages>
        <f7-page login-screen>
          <f7-login-screen-title>Kullanıcı Bilgileri</f7-login-screen-title>
          <f7-list form>
            <f7-list-item>
              <f7-label>İsim</f7-label>
              <f7-input name="name" type="text" placeholder="İsim" v-model="name"></f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>Soyisim</f7-label>
              <f7-input name="surname" type="text" placeholder="Soyisim" v-model="surname"></f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>Cihaz Kodu</f7-label>
              <f7-input name="deviceCode" type="text" placeholder="Cihaz Kodu"v-model="deviceCode"></f7-input>
            </f7-list-item>
          </f7-list>
          <f7-list>
            <f7-list-button @click="save()" title="Kaydet"></f7-list-button>
          </f7-list>
        </f7-page>
      </f7-pages>
    </f7-view>
  </f7-login-screen>

</template>

<script>
export default {
  data () {
    return {
      name: null,
      surname: null,
      deviceCode: null
    };
  },

  methods: {
    init() {
      this.name = this.$store.state.userInfo.name
      this.surname = this.$store.state.userInfo.surname
      this.deviceCode = this.$store.state.userInfo.deviceCode
    },

    save() {
      this.$store.commit('userInfo/change', this.$f7.formToData("form"));
      this.$f7.closeModal();
    },
  },

  mounted () {
    document.addEventListener('backbutton', (ev) => {
      if (this.$f7.getCurrentView().activePage.url == '#null') {
        navigator.app.exitApp();
      }
      else {
        this.$f7.getCurrentView().router.back();
      }
    });
  }
}
</script>

<style lang="css">
</style>
