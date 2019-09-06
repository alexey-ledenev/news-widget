<template>
    <div class="navigation">
      <div class="navigation-block" v-show="!load">
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
  @Prop({ default: false })
  private load!: boolean;

  @Prop({ default: true })
  private isBack!: boolean;

  @Prop({ default: true })
  private isNext!: boolean;

  private nav(side: number): void {
    if (!this.load) {
      const s = +side > 0 ? 1 : -1;
      this.$emit('nav', s);
    }
  }
}
</script>

<style scoped>
.navigation {
  max-width: 100%;
  display: flex;
  justify-content: flex-end;
}
.navigation .navigation-block {
  display: flex;
  align-items: center;
}
.navigation .navigation-block button {
  padding: 0 .75rem;
  color: #000000;
  background-color: #fff;
  border: 1px solid #ddd;
  font-size: 1.5rem;
  font-weight: bold;
  outline: none;
  cursor: pointer;
}
.navigation .navigation-block button:first-child {
  margin-right: -1px;
  border-bottom-left-radius: .25rem;
  border-top-left-radius: .25rem;
}
.navigation .navigation-block button:last-child {
  border-bottom-right-radius: .25rem;
  border-top-right-radius: .25rem;
}
.navigation .navigation-block button:hover {
  color: #014c8c;
  text-decoration: none;
  background-color: #eceeef;
  border-color: #ddd;
}
.navigation .navigation-block button:disabled {
  color: #818a91;
  pointer-events: none;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}
</style>
