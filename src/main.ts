import Vue from 'vue';
import App from './App.vue';

console.log('app.js загружен');

const VUE_EXTERNAL_NEWS = (url: string = '', selector: string = 'body', proxyUrl: string = '', requestLimit: number = 4, displayLimit: number = 2) => {
  console.log('Вход в VUE_EXTERNAL_NEWS');
  const app = document.createElement('div');
  const parentEl = document.querySelector(selector);
  if (parentEl) {
    parentEl.append(app);
    console.log(`Создан элемент внутри ${selector}`);
    Vue.config.productionTip = false;
    new Vue({
      render: h => h(App, {
        props: {
          baseUrl: new URL(url),
          proxyUrl,
          parentEl,
          requestLimit,
          displayLimit,
        },
      }),
    }).$mount(app);
    console.log('Vue приложение запущенно');
  }
};
// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
window.__VUE_EXTERNAL_NEWS__ = VUE_EXTERNAL_NEWS;
