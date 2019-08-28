<template>
  <div id="app">
    <carousel :itemsCount="2" :items="items" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Carousel from './components/carousel.vue';

@Component({
  components: {
    Carousel,
  },
})
export default class App extends Vue {
  private limit = 2

  private offset = 0

  private isNext = true

  private items = []

  private fetching() {
    const url = `https://prizyv31.ru/edw/api/data-marts/57/entities.json?limit=${this.limit}&offset=${this.offset}`
    return fetch('', {
        method: 'GET',
        mode: 'cors',
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        return Promise.reject(new Error('Network request failed with response ' + response.status + ': ' + response.statusText))
      }
    })
  }

  private processing(data) {
    if (!data.next) this.isNext = false
    const itms = [...data.results.objects]
    if (itms.length) {
      itms.forEach(itm => this.items.push(itm))
    }
  }

  private getItems() {
    if (this.isNext) {
      this.fetching()
        .then(data => this.processing(data))
        .catch(error => console.error(error))
    }
  }

  private mounted() {
    this.getItems()
  }
}
</script>
