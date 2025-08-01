<template>

  <router-link :to="{
    name: 'ImageDetails' ,
    params: {
      id: image.id ,
    }
  }">
    <div class="image-preview">
      <img :src="`${image.previewUrl}`" loading="lazy" alt="Gallery image"/>
    </div>
  </router-link>

</template>

<script setup lang="ts">
import type {Image} from '@/pages/ImageGallery/interfaces/Image.ts';

defineProps<{
  image: Image
}>()
</script>

<style scoped lang="scss">
.image-preview {
  height: 250px;
  width: 270px;
  border-radius: 10px;
}
</style>
