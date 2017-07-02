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
                  :count="$store.state.shortSurveys.trips.length"
                  :currentTrip="$store.state.shortSurveys.currentTrip"
                  @openSurveyList="$f7.mainView.router.loadPage('/surveyList/shortSurveys')"
<<<<<<< HEAD
                  @startTrip="$f7.mainView.router.loadPage('/startTrip/shortSurveys')"
                  @endTrip="$f7.mainView.router.loadPage('/endTrip/shortSurveys')">
=======
                  @startTrip="$router.loadPage('/startTrip/shortSurveys')"
                  @endTrip="$router.loadPage('/endTrip/shortSurveys')">
>>>>>>> 8b699a6d786042b5f70d403a0d5d34d635f62e98
    </survey-card>

    <survey-card
                  title="Uzun Anketler"
                  :count="$store.state.longSurveys.trips.length"
                  :currentTrip="$store.state.longSurveys.currentTrip"
                  @openSurveyList="$f7.mainView.router.loadPage('/surveyList/longSurveys')"
<<<<<<< HEAD
                  @startTrip="$f7.mainView.router.loadPage('/startTrip/longSurveys')"
                  @endTrip="$f7.mainView.router.loadPage('/endTrip/longSurveys')">
=======
                  @startTrip="$router.loadPage('/startTrip/longSurveys')"
                  @endTrip="$router.loadPage('/endTrip/longSurveys')">
>>>>>>> 8b699a6d786042b5f70d403a0d5d34d635f62e98
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
