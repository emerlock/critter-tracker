import bugJson from '@/assets/bug_final.json';
import fishJson from '@/assets/fish_final.json';
import Darkmode from 'darkmode-js';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

new Darkmode({ label: '🌓', buttonColorDark: '#fff00' }).showWidget();

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
  data: {
    userData: {
      bugData: [{
        Name: '', Price: 0, Location: '', Time: '', Jan: '', Feb: '', Mar: '', Apr: '', May: '', Jun: '', Jul: '', Aug: '', Sep: '', Oct: '', Nov: '', Dec: '', 'Start Date': '', 'End Date': '',
      }],
      fishData: [{
        Name: '', Price: 0, Location: '', Time: '', Jan: '', Feb: '', Mar: '', Apr: '', May: '', Jun: '', Jul: '', Aug: '', Sep: '', Oct: '', Nov: '', Dec: '', 'Start Date': '', 'End Date': '',
      }],
    },
  },
  beforeMount() {
    if (window.localStorage.getItem('userData') == null) {
      this.userData.bugData = bugJson;
      this.userData.fishData = fishJson;

      window.localStorage.setItem('userData', JSON.stringify(this.userData));
    } else {
      const jsonUserData = window.localStorage.getItem('userData') || '{}';
      this.userData = JSON.parse(jsonUserData);
    }
  },
}).$mount('#app');
