<template>
  <div class="header">
    <div class="back">
      <router-link :to="{ name: 'Gallery' }">
        <base-icon :icon-path="arrowLeftIcon" :width="'20px'"/>
      </router-link>
      <div v-if="image.loading">
        ...
      </div>
      <div v-else>
        {{ image.data?.author }}
      </div>
    </div>
    <div class="navigation">
      <base-icon @click="previousImage" :icon-path="caretLeftIcon" :width="'20px'"/>
      <base-icon @click="nextImage" :icon-path="caretRightIcon" :width="'20px'"/>
    </div>
    <div>
      <button>Download</button>
    </div>
  </div>

  <div v-if="image.loading">
    Data loading...
  </div>
  <div v-else class="image-details">
    <div class="image-size">
      {{ image.data?.width }}
      x
      {{ image.data?.height }}
    </div>

    <div class="image-container">
      <img :src="`${image.data?.download_url}`" alt="Image detail"/>
    </div>

  </div>
</template>

<script setup lang="ts">

import {computed, type ComputedRef, watch} from 'vue'
import {useGalleryStore} from '@/pages/ImageGallery/store.ts';
import type {Image} from '@/pages/ImageGallery/interfaces/Image.ts';
import type {LoadingState} from '@/shared/interfaces/LoadingState.ts';
import {useRoute, useRouter} from 'vue-router';
import BaseIcon from '@/shared/components/BaseIcon.vue';
import arrowLeftIcon from '@/assets/img/arrow-left-regular.svg'
import caretLeftIcon from '@/assets/img/caret-left-regular.svg'
import caretRightIcon from '@/assets/img/caret-right-regular.svg'


const route = useRoute()
const router = useRouter()

watch(
  () => route.params.id,
  (newId) => {
    galleryStore.fetchImageDetail(newId as string);
  }
)

const galleryStore = useGalleryStore();
galleryStore.fetchImageDetail(route.params.id as string);

const image: ComputedRef<LoadingState<Image>> = computed(() => galleryStore.imageDetail);

function previousImage() {
  const currentId = Number(route.params.id);
  router.push({name: 'ImageDetails', params: {id: String(currentId - 1)}});
}

function nextImage() {
  const currentId = Number(route.params.id);
  router.push({name: 'ImageDetails', params: {id: String(currentId + 1)}});
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
  .image-size {
    padding-top: 40px;
    padding-bottom: 10px;
  }

  .image-container {
    display: flex;
    justify-content: center;

    img {
      border-radius: 10px;
      width: 800px;
    }
  }
}
</style>
