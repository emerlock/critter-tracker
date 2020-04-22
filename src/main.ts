import bugJson from '@/assets/bug_final.json';
import fishJson from '@/assets/fish_final.json';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';


Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
  data: {
    userData: {
      bugData: [{
        Name: '', Price: '', Location: '', Time: '', Jan: '', Feb: '', Mar: '', Apr: '', May: '', Jun: '', Jul: '', Aug: '', Sep: '', Oct: '', Nov: '', Dec: '', 'Start Date': '', 'End Date': '',
      }],
      fishData: [{
        Name: '', Price: '', Location: '', Time: '', Jan: '', Feb: '', Mar: '', Apr: '', May: '', Jun: '', Jul: '', Aug: '', Sep: '', Oct: '', Nov: '', Dec: '', 'Start Date': '', 'End Date': '',
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
