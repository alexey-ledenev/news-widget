<template>
  <div class="carousel">
    <carousel-item
      v-for="item in items"
      :key="item.id"
      :item="item"
      :origin-path="originPath"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CarouselItem from './carousel-item.vue';
import { INewsItem } from '@/models';

@Component({
  components: { CarouselItem },
})
export default class Carousel extends Vue {
  @Prop({ default: [] })
  private items!: INewsItem[];

  @Prop({ default: '/' })
  private originPath!: string;
}
</script>

<style scoped>
.carousel {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: stretch;
  background-color: transparent;
}
@media (max-width: 575px) {
  .carousel {
    justify-content: center;
    align-items: center;
  }
}
</style>
