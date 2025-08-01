<template>
  <div v-if="images.loading">
    Loading...
  </div>
  <div class="image-container" v-else-if="images.data">
    <div v-for="image in images.data" :key="image.id">
      <image-preview :image="image"/>
    </div>
  </div>
  <div v-else>
    No images available
  </div>
</template>

<script setup lang="ts">
import {useGalleryStore} from '@/pages/ImageGallery/store.ts';
import {computed} from 'vue';
import ImagePreview from '@/pages/ImageGallery/components/ImagePreview.vue';

const galleryStore = useGalleryStore();
galleryStore.fetchImages();
const images = computed(() => (galleryStore.images));

</script>

<style scoped lang="scss">
.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
