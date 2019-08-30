<template>
  <div class="carousel">
    <carousel-item
      v-for="item in items"
      :key="item.id"
      :item="item"
      :origin-path="originPath"
      :style="`width: ${(100-itemsCount)/itemsCount}%`"
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
  @Prop({ default: 2 })
  private itemsCount!: number;

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
  align-items: center;
  background-color: transparent;
}
</style>
