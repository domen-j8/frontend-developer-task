<template>
  Gallery
  {{ galleryStore.currentPage }}
  <div v-if="images.loading">
    Loading...
  </div>
  <div v-else-if="images.data">
    <div v-for="image in images.data" :key="image.id">

      <img :src="`${image.previewUrl}`" alt="Gallery image" />

    </div>
  </div>
  <div v-else>
    No images available
  </div>
</template>

<script setup lang="ts">
import {useGalleryStore} from '@/pages/ImageGallery/store.ts';
import {computed} from 'vue';

const galleryStore = useGalleryStore();
galleryStore.fetchImages();
const images = computed(() => (galleryStore.images));

</script>

<style scoped lang="scss">

</style>
