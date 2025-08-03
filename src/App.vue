<template>
  <div class="app-container">
    <header class="header">
      <router-link :to="{ name: 'Gallery' }">
        <base-icon :icon-path="logoPath"/>
      </router-link>
    </header>

    <main>
      <router-view/>
    </main>

  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/shared/components/BaseIcon.vue';
import logoPath from '@/assets/img/logo.svg'

</script>

<style scoped lang="scss">
@use "@/assets/style/variables" as var;

.app-container {
  padding: 10px 10px 0 10px;
  background: var(--colors-base6);
  display: grid;
  grid-template-rows: 40px 1fr;
  min-height: 100svh;

  .header {
    display: flex;
    align-items: center;
    padding-inline: 10px;
  }

  main {
    justify-self: center;
    max-width: var.$content-max-width;
    width: 100%;
  }
}
</style>
