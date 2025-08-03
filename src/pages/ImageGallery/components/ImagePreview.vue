<template>

  <div
    class="image-preview"
    :class="{ viewed: viewedImage }"
    @click="navigateToImage">
    <img :src="`${image.previewUrl}`" loading="lazy" alt="Gallery image"/>
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

const props = defineProps<{
  image: Image,
  pageNumber: number,
  viewedImage: boolean
}>()

const router = useRouter()

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
  width: 270px;
  border-radius: 10px;
  background-color: var(--colors-base6);
  cursor: pointer;
  color: var(--colors-base0);

  &.viewed {
    box-shadow: rgba(6, 24, 44, 0.4) 0 0 0 2px, rgba(6, 24, 44, 0.65) 0 4px 6px -1px, rgba(255, 255, 255, 0.08) 0 1px 0px inset;
  }

  img {
    height: 250px;
    border-radius: 10px 10px 0 0;
  }

  .image-data {
    padding: 15px;
    font-size: 14px;

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
