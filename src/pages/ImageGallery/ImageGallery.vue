<template>
  <base-paginator
    @page-change="changePage($event)"
    :page-number="currentPage"
    :total-items="galleryStore.totalItems"
    :page-size="galleryStore.pageSize"/>

  <div v-if="images.loading">
    Loading...
  </div>
  <div class="image-container" v-else-if="images.data">
    <div v-for="image in images.data" :key="image.id">
      <image-preview
        :image="image"
        :page-number="currentPage"
        :viewedImage="image.id === viewedImageId"/>
    </div>
  </div>
  <div v-else>
    No images available
  </div>

</template>

<script setup lang="ts">
import {useGalleryStore} from '@/pages/ImageGallery/store.ts';
import {computed, type ComputedRef, watchEffect} from 'vue';
import ImagePreview from '@/pages/ImageGallery/components/ImagePreview.vue';
import BasePaginator from '@/shared/components/BasePaginator.vue';
import {type LocationQueryValue, useRoute, useRouter} from 'vue-router';
import type {Image} from '@/pages/ImageGallery/interfaces/Image.ts';
import type {LoadingState} from '@/shared/interfaces/LoadingState.ts';

const route = useRoute();
const router = useRouter();
const galleryStore = useGalleryStore();

const images: ComputedRef<LoadingState<Image[]>> = computed(() => (galleryStore.images));
const currentPage: ComputedRef<number> = computed(() => Number(route.params.page) || 1);
const viewedImageId: ComputedRef<LocationQueryValue> = computed(() => route.query.viewed as LocationQueryValue);

watchEffect(() => {
  galleryStore.setPageImages(currentPage.value);
});

function changePage(page: number) {
  router.push({ name: 'Gallery', params: { page: page } });
}
</script>

<style scoped lang="scss">
.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
