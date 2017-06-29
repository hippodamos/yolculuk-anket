<template>

  <f7-page>

    <f7-navbar>
      <f7-nav-left>
      </f7-nav-left>
      <f7-nav-center>Yolculuk Anket Uygulaması</f7-nav-center>
      <f7-nav-right>
      </f7-nav-right>
    </f7-navbar>

    <f7-card>
      <f7-card-header>
        <div>Kullanıcı Bilgileri</div>
        <f7-link open-login-screen>Değiştir</f7-link>
      </f7-card-header>
      <f7-card-content>
        <f7-list>
          <f7-list-item title="İsim">{{userInfo.name}} {{userInfo.surname}}</f7-list-item>
          <f7-list-item title="Cihaz Kodu">{{ userInfo.deviceCode }}</f7-list-item>
        </f7-list>
      </f7-card-content>
    </f7-card>

    <survey-card
                  title="Kısa Anketler"
                  :count="13">
    </survey-card>

  </f7-page>

</template>

<script>

export default {
  components: {
    "survey-card": require("assets/vue/components/survey-card.vue")
  },

  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  }
}

</script>
