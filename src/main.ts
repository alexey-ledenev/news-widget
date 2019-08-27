import Vue from 'vue';
import App from './App.vue';

// const app = document.createElement('div')
// app.id = 'app'
// document.body.append(app)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
