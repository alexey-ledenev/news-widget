<template>
  <div class="carousel">
    <carousel-item
      v-for="item in items"
      :key="item.title"
      :item="item"
      :style="`width: ${(100-itemsCount)/itemsCount}%`"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CarouselItem from './carousel-item.vue'

@Component({
  components: { CarouselItem }
})
export default class Carousel extends Vue {
  @Prop({ default: 2 })
  private itemsCount!: number;

  @Prop({ default: 2 })
  private items!: Array<any>;

  private get displayItems() {
    return this.items.slice(-this.itemsCount) || []
  }
}
</script>

<style scoped>
.carousel {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}
</style>
