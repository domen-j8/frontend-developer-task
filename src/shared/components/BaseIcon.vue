<template>
  <img :src="iconPath"
       :style="{ width, height }"
       alt="Icon"
       class="icon"
       :class="{ disabled: disabled }"/>
</template>

<script setup lang="ts">

defineProps<{
  iconPath: string,
  width?: string,
  height?: string,
  disabled?: boolean,
}>()

</script>

<style scoped lang="scss">
.icon {
  cursor: pointer;
  user-select: none;

  &.disabled {
    opacity: 0.3;
    cursor: default;
  }
}
</style>
