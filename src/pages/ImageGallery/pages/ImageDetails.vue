<template>
  <div class="image-details-container">
    <div class="header">
      <div class="back">
        <router-link :to="{
        name: 'Gallery',
        params: { page: pageNumber },
        query: { viewed: route.params.id } }">
          <base-icon :icon-path="arrowLeftIcon" :width="'18px'"/>
        </router-link>

        <template v-if="imageDetail.loading">
          <base-loader :height="'20px'" :width="'150px'"/>
        </template>
        <template v-else>
          {{ imageDetail.data?.author }}
        </template>
      </div>

      <div class="navigation">
        <div class="previous" @click="previousImage">
          <base-icon
            :icon-path="caretLeftIcon"
            :width="'16px'"
            :disabled="galleryStore.firstImageId === imageDetail.data?.id"/>
        </div>
        <div class="next" @click="nextImage">
          <base-icon
            :icon-path="caretRightIcon"
            :width="'16px'"
            :disabled="galleryStore.lastImageId === imageDetail.data?.id"/>
        </div>
      </div>

      <div class="download">
        <button class="primary">Download</button>
      </div>

    </div>

    <div class="image-content">
      <div class="image-details">
        <template v-if="imageDetail.loading">
          <base-loader :height="'20px'" :width="'100px'"/>
        </template>
        <template v-else>
          {{ imageDetail.data?.width }}
          x
          {{ imageDetail.data?.height }}
        </template>
      </div>

      <div class="image-container">
        <div class="image-wrapper">
          <base-loader
            :absolute="true"
            :border-radius="'10px'"
            v-if="imageLoading || imageDetail.loading"/>
          <img
            :src="`${imageDetail.data?.download_url}`"
            @load="onImageLoad"
            alt="Image detail"
          />
        </div>
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
@use "@/assets/style/variables" as var;

.image-details-container {
  background: var(--colors-base9);
  height: 100%;
  border-radius: 5px;

  .header {
    --padding-block: 10px;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    border-bottom: 1px solid var(--colors-base5);
    padding-inline: 20px;

    .back {
      display: flex;
      align-items: center;
      gap: 15px;
      font-size: 14px;
      padding-block: var(--padding-block);
    }

    .navigation {
      display: flex;
      gap: 70px;
      justify-self: center;

      .previous, .next {
        cursor: pointer;
        padding: var(--padding-block);
      }
    }

    .download {
      font-size: 12px;
      justify-self: center;
      padding-block: var(--padding-block);
    }
  }

  .image-content {
    background: var(--colors-base7);
    margin: 20px;
    border-radius: 10px;
    padding: 20px 20px 50px 20px;

    .image-details {
      padding-bottom: 10px;
      font-size: 12px;
      color: var(--colors-base1);
    }

    .image-container {
      display: flex;
      justify-self: center;
      max-width: 800px;
      width: 100%;

      .image-wrapper {
        position: relative;
        width: 100%;
        min-height: 200px;

        img {
          border-radius: 10px;
        }
      }
    }
  }

}

@media (min-width: var.$tablet-screen-breakpoint) {
  .image-details-container {
    .header {
      grid-template-columns: 1fr auto 1fr;

      .download {
        justify-self: end;
      }
    }

    .image-content {
      .image-container {
        .image-wrapper {
          min-height: 400px;
        }
      }
    }
  }
}
</style>
