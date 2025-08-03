<template>
  <div class="gallery-container">
    <div class="paginator-wrapper">
      <base-paginator
        @page-change="changePage($event)"
        :page-number="currentPage"
        :total-items="galleryStore.totalItems"
        :page-size="galleryStore.pageSize"/>
    </div>

    <div class="gallery-items">
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
    </div>
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
@use "@/assets/style/variables" as var;

.gallery-container {
  background: var(--colors-base9);
  border-radius: 5px;

  .paginator-wrapper {
    padding: 10px 15px;
    border-bottom: 1px solid var(--colors-base5);
  }

  .gallery-items {
    padding: 20px;

    .image-container {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: center;
    }
  }
}

@media (min-width: var.$tablet-screen-breakpoint) {
  .gallery-container {
    .gallery-items {
      .image-container {
        justify-content: flex-start;
      }
    }
  }
}

</style>
