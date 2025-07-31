<template>
  <header class="header">
    <base-icon :icon-path="logoPath"/>
  </header>
  <router-view/>
</template>

<script setup lang="ts">
import BaseIcon from '@/shared/components/BaseIcon.vue';
import logoPath from '@/assets/img/logo.svg'


</script>

<style scoped lang="scss">
.header {
  height: 40px;
}
</style>
