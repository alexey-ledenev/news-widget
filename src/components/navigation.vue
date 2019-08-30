<template>
    <div class="navigation">
      <div class="navigation-block">
        <button :class="!isBack ? 'disabled' : ''" :disabled="!isBack" @click="nav(-1)">
          &#8249;
        </button>
        <button :class="!isNext ? 'disabled' : ''" :disabled="!isNext" @click="nav(1)">
          &#8250;
        </button>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
  @Prop({ default: true })
  private isBack!: boolean;

  @Prop({ default: true })
  private isNext!: boolean;

  private nav(side: number): void {
    const s = +side > 0 ? 1 : -1;
    this.$emit('nav', s);
  }
}
</script>

<style scoped>
.navigation {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
  transform: translateY(-3rem);
}
.navigation .navigation-block {
  display: flex;
  align-items: center;
}
</style>
