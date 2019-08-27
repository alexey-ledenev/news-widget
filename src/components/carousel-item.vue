<template>
  <div class="carousel-item">
    <div class="carousel-item-image">
      <a href="">
        <img src="" alt="">
      </a>
    </div>
    <div class="carousel-item-text">
      <div class="carousel-item-text__title">
        <h4>
          <a href=""></a>
        </h4>
      </div>
      <div class="carousel-item-text__date"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ICarouselItem } from '@/models'

@Component
export default class CarouselItem extends Vue {
  @Prop() private item!: ICarouselItem;
}
</script>

<style scoped>
.carousel-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.carousel-item-image {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding-right: 1rem;
}
.carousel-item-image img {
  max-width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  max-height: 100px;
  transition: all .2s ease-out 0s;
}
.carousel-item-image img:hover {
  transform: scale(1.07);
}
.carousel-item-text .carousel-item-text__title {
  margin-bottom: 0.5rem;
}
.carousel-item-text .carousel-item-text__title > * {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.4;
  color: #555;
}
.carousel-item-text .carousel-item-text__date {
  font-size: .73rem;
  color: #999;
}
</style>
