import Vue from 'vue';
import App from './App.vue';

const widgetGuid = 'b9c9-3eb89fea9247';
const windowGuid = 'nwb9c93eb89fea9247';

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
          parentEl,
        },
      }),
    }).$mount(app);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  if (window[windowGuid]) {
    return;
  }
  const elements = document.querySelectorAll(`[data-${widgetGuid}]`);
  if (!elements.length) {
    return;
  }
  [].forEach.call(elements, (el) => {
    const { dataset } = el;
    const {
      url, title, proxyUrl, source, requestLimit, displayLimit,
    } = dataset;
    const parentEl = document.createElement('div');
    parentEl.classList.add('vue-external-news-widget');
    // @ts-ignore
    el.replaceWith(parentEl);
    initApp(
      url,
      title || 'Новости',
      parentEl,
      proxyUrl || 'proxy/',
      source || '',
      +requestLimit || 4,
      +displayLimit || 2,
    );
  });
  // @ts-ignore
  window[windowGuid] = true;
});
