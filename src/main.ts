import Vue from 'vue';
import App from './App.vue';

// Для тестирования (следующие 4 строки)
const tst = document.createElement('div');
tst.id = 'tst';
tst.dataset.fetchUrl = 'https://prizyv31.ru/edw/api/data-marts/57/entities.json';
document.body.append(tst);

document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div');
  document.body.append(app);

  Vue.config.productionTip = false;

  new Vue({
    render: h => h(App),
  }).$mount(app);
});
