<template>
  <div class="header">

    <div class="back">
      <router-link :to="{
        name: 'Gallery',
        params: { page: pageNumber },
        query: { viewed: route.params.id } }">
        <base-icon :icon-path="arrowLeftIcon" :width="'20px'"/>
      </router-link>
<!--      <div v-if="image.loading">-->
<!--        ...-->
<!--      </div>-->
<!--      <div v-else>-->
<!--        {{ image.data?.author }}-->
<!--      </div>-->
    </div>

    <div class="navigation">
      <base-icon
        @click="previousImage"
        :icon-path="caretLeftIcon"
        :width="'20px'"
        :disabled="galleryStore.firstImageId === imageDetail.data?.id"/>
      <base-icon
        @click="nextImage"
        :icon-path="caretRightIcon"
        :width="'20px'"
        :disabled="galleryStore.lastImageId === imageDetail.data?.id"/>
    </div>

    <div>
      <button>Download</button>
    </div>

  </div>

  <div>
    <div class="image-details">
      <template v-if="imageDetail.loading">
        <base-loader :height="'40px'" :width="'200px'"/>
      </template>
      <template v-else>
        {{ imageDetail.data?.width }}
        x
        {{ imageDetail.data?.height }}
      </template>
    </div>

    <div class="image-container">
      <div class="image-wrapper">
        <base-loader :absolute="true" v-if="imageLoading"/>
        <img
          :src="`${imageDetail.data?.download_url}`"
          @load="onImageLoad"
          alt="Image detail"
        />
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">

import {computed, type ComputedRef, ref, watch} from 'vue'
import {useGalleryStore} from '@/pages/ImageGallery/store.ts';
import type {Image} from '@/pages/ImageGallery/interfaces/Image.ts';
import type {LoadingState} from '@/shared/interfaces/LoadingState.ts';
import {useRoute, useRouter} from 'vue-router';
import BaseIcon from '@/shared/components/BaseIcon.vue';
import arrowLeftIcon from '@/assets/img/arrow-left-regular.svg'
import caretLeftIcon from '@/assets/img/caret-left-regular.svg'
import caretRightIcon from '@/assets/img/caret-right-regular.svg'
import BaseLoader from '@/shared/components/BaseLoader.vue';

const route = useRoute()
const router = useRouter()
const galleryStore = useGalleryStore();

const pageNumber: ComputedRef<number> = computed(() => Number(route.params.page));
const imageDetail: ComputedRef<LoadingState<Image>> = computed(() => galleryStore.imageDetail);

const imageLoading = ref(false)
let imageLoadingTimeout: number;

watch(
  () => route.params.id,
  (newId, _, onCleanUp) => {
    galleryStore.setImageDetail(Number(route.params.page), newId as string);
    imageLoadingTimeout = setTimeout(() => {
      imageLoading.value = true;
    }, 200);

    onCleanUp(() => {
      if (imageLoadingTimeout) {
        clearTimeout(imageLoadingTimeout);
      }
    });
  },
  { immediate: true }
)

async function previousImage() {
  const { targetImageId, targetPageNumber } = await galleryStore.getPreviousImage(Number(route.params.page), route.params.id as string);
  if (targetImageId && targetPageNumber) {
    await router.push({name: 'ImageDetails', params: {page: targetPageNumber, id: targetImageId}});
  } else {
    //todo notify user that something is wrong
  }
}

async function nextImage() {
  const currentImageId = route.params.id as string;
  if (galleryStore.lastImageId !== currentImageId) {
    const { targetImageId, targetPageNumber } = await galleryStore.getNextImage(Number(route.params.page), currentImageId);
    if (targetImageId && targetPageNumber) {
      await router.push({name: 'ImageDetails', params: {page: targetPageNumber, id: targetImageId}});
    } else {
      //todo notify user that something is wrong
    }
  }
}

function onImageLoad() {
  imageLoading.value = false;
  if (imageLoadingTimeout) {
    clearTimeout(imageLoadingTimeout);
  }
}

</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding: 5px 10px;

  .back {
    display: flex;
    align-items: center;
  }

  .navigation {
    display: flex;
  }
}

.image-details {
  padding-top: 40px;
  padding-bottom: 10px;
}

.image-container {
  display: flex;
  justify-content: center;

  .image-wrapper {
    position: relative;
    width: 800px;
    min-height: 400px;

    img {
      border-radius: 10px;
    }
  }
}
</style>
