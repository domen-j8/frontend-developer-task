<template>
  <img :src="iconPath"
       :style="{ width, height }"
       alt="Icon"/>
</template>

<script setup lang="ts">

defineProps<{
  iconPath: string,
  width?: string,
  height?: string
}>()

</script>

<style scoped lang="scss">

</style>
