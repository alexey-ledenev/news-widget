<template>
  <div class="news-slider">
    <navigation :is-back="isBack" :is-next="isNext" @nav="onNav" />
    <carousel
      :itemsCount="displayLimit"
      :items="displayItems"
      :origin-path="baseUrl ? baseUrl.origin : '/'"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Carousel from './components/carousel.vue';
import Navigation from './components/navigation.vue';
import { INewsItem, NewsItem } from '@/models';

@Component({
  components: { Carousel, Navigation },
})
export default class App extends Vue {
  private baseUrl: URL | null = null;

  private requestLimit = 4;

  private requestOffset = 0;

  private displayLimit = 2;

  private displayOffset = 0;

  private isNewReqExists = true;

  private items: INewsItem[] = [];

  private fetching() {
    const url = `/edw/api/data-marts/57/entities.json?limit=${this.requestLimit}&offset=${this.requestOffset}`;
    // eslint-disable-next-line max-len
    // const url = `${this.baseUrl ? this.baseUrl.href : '/'}?limit=${this.requestLimit}&offset=${this.requestOffset}`;
    return fetch(url, {
      // method: 'GET',
      // mode: 'cors',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`Network request failed with response ${response.status}: ${response.statusText}`));
      });
  }

  private processing(data: any) {
    this.requestOffset += this.requestLimit;
    if (!data.next) this.isNewReqExists = false;
    const itms = [...data.results.objects];
    if (itms.length) {
      itms.forEach(itm => this.items.push(new NewsItem(
        itm.id,
        itm.entity_name,
        itm.extra.short_subtitle,
        itm.media,
        itm.extra.updated_at,
        itm.extra.url,
      )));
    }
  }

  private getItems() {
    if (this.isNewReqExists) {
      this.fetching()
        .then(data => this.processing(data))
        .catch(error => console.error(error));
    }
  }

  private async onNav(side: number) {
    let slided = false;
    if (side <= 0) {
      if (this.isBack) slided = true;
    } else {
      try {
        if (this.isNewReq) await this.getItems();
        if (this.isNext) slided = true;
      } catch (e) {
        console.error(e);
      }
    }
    if (slided) {
      this.displayOffset += this.displayLimit * side;
    }
  }

  private get isNext() {
    return ((this.items.length - this.displayOffset) > this.displayLimit) || this.isNewReqExists;
  }

  private get isBack() {
    return this.displayOffset >= this.displayLimit;
  }

  private get isNewReq() {
    return (this.requestOffset - this.displayOffset) <= this.displayOffset;
  }

  private get displayItems() {
    return this.items.slice(this.displayOffset, this.displayOffset + this.displayLimit) || [];
  }

  private async mounted() {
    // @ts-ignore
    this.baseUrl = new URL(document.getElementById('tst').dataset.fetchUrl || '/');
    await this.getItems();
  }
}
</script>

<style scoped>
.news-slider {
  position: relative;
  max-width: 1140px;
  margin: 10rem auto;
}
</style>
