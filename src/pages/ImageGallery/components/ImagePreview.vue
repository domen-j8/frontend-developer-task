<template>
  <div
    class="image-preview"
    :class="{ viewed: viewedImage }"
    :style="{ width, height }"
    @click="navigateToImage">

    <div class="image-wrapper">
      <base-loader :absolute="true" v-if="imageLoading"/>
      <img
        :src="`${image.previewUrl}`"
        @load="onImageLoad"
        loading="lazy"
        alt="Gallery image"/>
    </div>

    <div class="image-data">
      <div class="author">{{ image.author }}</div>
      <div class="download">
        <button class="primary">Download</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Image} from '@/pages/ImageGallery/interfaces/Image.ts';
import {useRouter} from 'vue-router';
import BaseLoader from '@/shared/components/BaseLoader.vue';
import {ref} from 'vue';

const props = defineProps<{
  image: Image,
  pageNumber: number,
  viewedImage: boolean,
  width: string,
  height: string
}>()

const router = useRouter()
const imageLoading = ref(true);

function onImageLoad() {
  imageLoading.value = false;
}

function navigateToImage() {
  router.push({
    name: 'ImageDetails',
    params: {
      page: props.pageNumber,
      id: props.image.id,
    }
  })
}
</script>

<style scoped lang="scss">
.image-preview {
  border-radius: 10px;
  background-color: var(--colors-base6);
  cursor: pointer;
  color: var(--colors-base0);
  display: grid;
  position: relative;

  &.viewed {
    box-shadow: rgba(6, 24, 44, 0.4) 0 0 0 2px, rgba(6, 24, 44, 0.65) 0 4px 6px -1px, rgba(255, 255, 255, 0.08) 0 1px 0px inset;
  }

  .image-wrapper {
    position: relative;
    height: 250px;
    border-radius: 10px 10px 0 0;

    img {
      border-radius: 10px 10px 0 0;
    }
  }

  .image-data {
    font-size: 14px;
    padding-left: 15px;

    .author {
      border-bottom: 1px solid var(--colors-base4);
      padding-bottom: 10px;
    }

    .download {
      padding-top: 15px;
      font-size: 12px;
    }
  }

}
</style>
