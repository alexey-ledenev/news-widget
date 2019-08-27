<template>
  <div id="app">
    <carousel :itemsCount="2" :items="[]" />
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
  mounted() {
    // fetching data
  }
}
</script>
