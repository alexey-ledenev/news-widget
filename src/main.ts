import Vue from 'vue';
import App from './App.vue';

const initApp = (url: string = '', title: string = '', parentEl: Element | null = null, proxyUrl: string = '', source: string = '', requestLimit: number = 4, displayLimit: number = 2) => {
  if (parentEl) {
    const app = document.createElement('div');
    parentEl.append(app);
    Vue.config.productionTip = false;
    new Vue({
      render: h => h(App, {
        props: {
          baseUrl: new URL(url),
          proxyUrl,
          title,
          source,
          requestLimit,
          displayLimit,
        },
      }),
    }).$mount(app);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-vue-external-news-widget]');
  if (!elements.length) {
    return;
  }
  [].forEach.call(elements, (el) => {
    const { dataset } = el;
    const {
      url, title, proxyUrl, source, requestLimit, displayLimit,
    } = dataset;
    initApp(url, title, el, proxyUrl || '', source || '', +requestLimit || 4, +displayLimit || 2);
  });
});
