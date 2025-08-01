<template>

  <router-link :to="{
    name: 'ImageDetails' ,
    params: {
      page: pageNumber,
      id: image.id ,
    }
  }">
    <div class="image-preview" :class="{ viewed: viewedImage }">
      <img :src="`${image.previewUrl}`" loading="lazy" alt="Gallery image"/>
    </div>
  </router-link>

</template>

<script setup lang="ts">
import type {Image} from '@/pages/ImageGallery/interfaces/Image.ts';

defineProps<{
  image: Image,
  pageNumber: number,
  viewedImage: boolean
}>()
</script>

<style scoped lang="scss">
.image-preview {
  height: 250px;
  width: 270px;
  border-radius: 10px;

  &.viewed {
    border: 5px solid red;
    border-radius: 15px;
  }

  img {
    border-radius: 10px;
  }
}
</style>
