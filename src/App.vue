<template>
  <div class="news-slider">
    <div class="news-slider-header">
      <div v-if="title" class="news-slider-header__title">
        <h3>{{ title }}</h3>
      </div>
      <div class="news-slider-header__nav">
        <navigation :is-back="isBack" :is-next="isNext" @nav="onNav" />
      </div>
    </div>
    <carousel
      :itemsCount="displayLimit"
      :items="displayItems"
      :origin-path="baseUrl ? baseUrl.origin : '/'"
    />
    <div v-if="source" class="news-slider-footer">
      <a
        :href="baseUrl ? baseUrl.origin : '/'"
        class="ex-news-url text-muted"
        target="_blank">
        {{ source }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Carousel from './components/carousel.vue';
import Navigation from './components/navigation.vue';
import { INewsItem, NewsItem } from '@/models';

@Component({
  components: { Carousel, Navigation },
})
export default class App extends Vue {
  @Prop({ default: null })
  private baseUrl!: URL | null;

  @Prop({ default: '' })
  private proxyUrl!: string;

  @Prop({ default: '' })
  private title!: string;

  @Prop({ default: '' })
  private source!: string;

  @Prop({ default: 4 })
  private requestLimit!: number;

  @Prop({ default: 2 })
  private displayLimit!: number;

  private requestOffset = 0;

  private displayOffset = 0;

  private isNewReqExists = true;

  private items: INewsItem[] = [];

  private fetching() {
    const url = process.env.NODE_ENV === 'development'
      ? `/edw/api/data-marts/57/entities.json?limit=${this.requestLimit}&offset=${this.requestOffset}`
      : `${this.baseUrl ? this.proxyUrl + this.baseUrl.href : '/'}?limit=${this.requestLimit}&offset=${this.requestOffset}`;
    return fetch(url)
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
    await this.getItems();
  }
}
</script>

<style scoped>
.news-slider {
  position: relative;
  max-width: 100%;
}
.news-slider .news-slider-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.news-slider .news-slider-footer {
  width: 100%;
  text-align: right;
  margin-top: 0.3rem;
}
.news-slider .news-slider-footer a {
  color: #cccccc;
  text-decoration: none;
}
</style>
