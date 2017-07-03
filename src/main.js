// Import Vue
import Vue from 'vue';

// Import Vuex
import Vuex from 'vuex';

// Import F7
import Framework7 from 'framework7';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue';

// Import F7 iOS Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css';
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css';
/* OR for Material Theme:
 import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
 import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
 */

// Import App Custom Styles
import AppStyles from './assets/sass/main.scss';

require('datejs');

// Import Routes
import Routes from './routes.js';

// Import App Component
import App from './main.vue';

// Init F7 Vue Plugin
Vue.use(Framework7Vue);

// Init Vuex Plugin
Vue.use(Vuex);

// Main app mixins
import mainMixins from 'main-mixins.js';

const store = new Vuex.Store({});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Init App
  let mainApp = new Vue({
    el: '#app',

    template: '<app/>',
    // Global store
    store,
    // Init Framework7 by passing parameters here
    framework7: {
      root: '#app',
      /* Uncomment to enable Material theme: */
      // material: true,
      routes: Routes,
      modalButtonOk: "Tamam",
      modalButtonCancel: "İptal",
    },
    // Register App Component
    components: {
      app: App,
    },

    mixins: mainMixins,

    mounted () {
      // Back button event handler
      document.addEventListener('backbutton', (ev) => {
        if (this.$f7.getCurrentView().activePage.url == '#null') {
          navigator.app.exitApp();
        }
        else {
          this.$f7.getCurrentView().router.back();
        }
      });
    }
  });

  window.$mainApp = mainApp;
}
