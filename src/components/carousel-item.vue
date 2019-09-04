<template>
  <div v-if="item !== null" class="carousel-item">
    <div class="carousel-item-image">
      <a :href="originPath + item.url" :title="item.title" target="_blank">
        <img :src="originPath + item.image" :alt="item.title" :title="item.title">
      </a>
    </div>
    <div class="carousel-item-text">
      <div class="carousel-item-text__title">
        <h4>
          <a
            :href="originPath + item.url"
            :title="item.subtitle"
            target="_blank"
          >{{ item.title }}</a>
        </h4>
      </div>
      <div class="carousel-item-text__date">{{ item.date }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { INewsItem } from '@/models';

@Component
export default class CarouselItem extends Vue {
  @Prop({ default: null })
  private item!: INewsItem;

  @Prop({ default: '/' })
  private originPath!: string;
}
</script>

<style scoped>
.carousel-item {
  width: 49%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  padding: 0.3rem;
}
.carousel-item:hover {
  border-color: #7e8893;
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
.carousel-item-text .carousel-item-text__title a {
  text-decoration: none;
  color: #555;
}
.carousel-item-text .carousel-item-text__date {
  font-size: .73rem;
  color: #999;
}

@media (max-width: 575px) {
  .carousel-item {
    width: 95%;
  }
}
</style>
