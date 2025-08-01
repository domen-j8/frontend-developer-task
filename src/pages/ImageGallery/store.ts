import {defineStore} from 'pinia';
import {ref} from 'vue';
import axios from 'axios';
import type {Image} from '@/pages/ImageGallery/interfaces/Image.ts';
import type {LoadingState} from '@/shared/interfaces/LoadingState.ts';

export const useGalleryStore = defineStore('gallery', () => {
  const currentPage = ref<number>(1);
  const images = ref<LoadingState<Image[]>>({
    loading: false
  });
  const imageDetail = ref<LoadingState<Image>>({
    loading: false,
  })

  async function fetchImages() {
    try {
      images.value.loading = true;
      const response = await axios.get<Image[]>('https://picsum.photos/v2/list');
      images.value.data = response.data;
      images.value.data?.map( (image: Image) => {
        image.previewUrl = image.download_url.replace(/\/\d+\/\d+$/, '/270/250');
        return image;
      });
    } catch {
      images.value.data = null;
    } finally {
      images.value.loading = false
    }
  }

  async function fetchImageDetail(id: string) {
    try {
      imageDetail.value.loading = true;
      const response = await axios.get<Image>(`https://picsum.photos/id/${id}/info`)
      imageDetail.value.data = response.data;
    } catch {
      imageDetail.value.data = null;
    } finally {
      imageDetail.value.loading = false;
    }
  }

  return {
    currentPage,
    images,
    imageDetail,
    fetchImages,
    fetchImageDetail
  };
})
