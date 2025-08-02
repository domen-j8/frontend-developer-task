<template>
  <div
    class="loader-container skeleton-box"
    :class="{ 'absolute': absolute }"
    :style="{
      width: width ? width : undefined,
      height: height ? height : undefined,
      borderRadius: borderRadius ? borderRadius : undefined
    }"
  >
  </div>
</template>

<script setup lang="ts">
interface Props {
  absolute?: boolean;
  width?: string;
  height?: string;
  borderRadius?: string;
}

withDefaults(defineProps<Props>(), {
  absolute: false,
  borderRadius: '5px'
});
</script>

<style scoped lang="scss">
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;

  &.absolute {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.skeleton-box {
  background-color: #DDDBDD;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>

