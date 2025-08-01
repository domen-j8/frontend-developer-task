<template>
  <img :src="iconPath"
       :style="{ width, height }"
       alt="Icon"
       class="icon"/>
</template>

<script setup lang="ts">

defineProps<{
  iconPath: string,
  width?: string,
  height?: string
}>()

</script>

<style scoped lang="scss">
.icon {
  cursor: pointer;
}
</style>
