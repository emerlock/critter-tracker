import critterJson from '@/json/all_critter.json';
import Darkmode from 'darkmode-js';
import VueMobileDetection from 'vue-mobile-detection';
import Vue from 'vue';
import LoadScript from 'vue-plugin-load-script';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';


new Darkmode({ label: '🌓', buttonColorDark: '#fff00' }).showWidget();

Vue.config.productionTip = false;
Vue.use(VueMobileDetection);
Vue.use(LoadScript);


new Vue({
  router,
  render: (h) => h(App),
  data: {
    userData: {
      critterData: [{
        Name: '', Price: 0, Location: '', Time: '', Jan: '', Feb: '', Mar: '', Apr: '', May: '', Jun: '', Jul: '', Aug: '', Sep: '', Oct: '', Nov: '', Dec: '', 'Start Time': 0, 'End Time': 0, 'Critter Type': '',
      }],
    },
  },
  beforeMount() {
    if (window.localStorage.getItem('userData') == null) {
      this.userData.critterData = critterJson;

      window.localStorage.setItem('userData', JSON.stringify(this.userData));
    } else {
      const jsonUserData = window.localStorage.getItem('userData') || '{}';
      const parsedJson = JSON.parse(jsonUserData);
      // Hardcoded solution to update people's data if they do not yet have the critterData added
      // probably eventually simplify everything to that single object
      // will need to update art?
      if (parsedJson.critterData == null || parsedJson.critterData[0].Owned == null || parsedJson.critterData[0]['Start Time'] == null) {
        this.userData.critterData = critterJson;
        window.localStorage.setItem('userData', JSON.stringify(this.userData));
      } else {
        this.userData = JSON.parse(jsonUserData);
      }
    }
  },
}).$mount('#app');
