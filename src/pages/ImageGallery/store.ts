import {defineStore} from 'pinia';
import {ref} from 'vue';
import axios from 'axios';
import type {Image} from '@/pages/ImageGallery/interfaces/Image.ts';
import type {LoadingState} from '@/shared/interfaces/LoadingState.ts';
import type {ImageNavigation} from '@/pages/ImageGallery/interfaces/ImageNavigation.ts';

export const useGalleryStore = defineStore('gallery', () => {
  const totalItems = 120;
  const pageSize = 20;
  const firstImageId = ref<string | null>(null);
  const lastImageId = ref<string | null>(null);
  const images = ref<LoadingState<Image[]>>({
    loading: false
  });
  const allImages = ref<Map<number, Image[]>>(new Map());
  const imageDetail = ref<LoadingState<Image>>({
    loading: false,
  })
  let imagesController: AbortController | null = null;

  async function setPageImages(page: number) {
    if (allImages.value.has(page)) {
      images.value.data = allImages.value.get(page);
    } else {
      await fetchImages(page);
    }
  }

  function setImageDetail(page: number, imageId: string) {
    if (!images.value.data || !images.value.data.find(image => image.id === imageId)) {
      imageDetail.value.loading = true;
      setPageImages(page).then(() => {
        const image = images.value.data?.find(image => image.id === imageId);
        if (image) {
          imageDetail.value.data = image;
        } else {
          imageDetail.value.data = null;
        }
        imageDetail.value.loading = false;
      });
    } else {
      imageDetail.value.data = images.value.data.find(image => image.id === imageId) || null;
    }
  }

  async function fetchImages(page: number = 1) {
    try {
      images.value.loading = true;
      if (imagesController) {
        imagesController.abort();
      }
      imagesController = new AbortController();
      const response = await axios.get<Image[]>(`https://picsum.photos/v2/list?page=${page}&limit=${pageSize}`, {
        signal: imagesController.signal
      })
      if (page === 1) {
        firstImageId.value = response.data[0].id;
      }
      // consider that totalItems would be included in response
      const totalPages = Math.ceil(totalItems / pageSize);
      if (totalPages === page) {
        lastImageId.value = response.data[response.data.length - 1].id;
      } else if (page > totalPages) {
        // Simulate error if fetching images that don't exist (e.g. above last page)
        throw new Error('Page not found');
      }
      images.value.data = response.data;
      images.value.data?.map( (image: Image) => {
        image.previewUrl = image.download_url.replace(/\/\d+\/\d+$/, '/270/250');
        return image;
      });
      allImages.value.set(page, images.value.data);
    } catch (err) {
      images.value.data = null;
      throw err;
    } finally {
      images.value.loading = false
    }
  }

  async function getPreviousImage(currentPage: number, imageId: string): Promise<ImageNavigation> {
    const targetImage = {
      targetImageId: null,
      targetPageNumber: null
    } as ImageNavigation;

    if(!images.value.data) {
      imageDetail.value.loading = true;
      await setPageImages(currentPage);
      if (!images.value.data) {
        imageDetail.value.loading = false;
        return targetImage;
      }
    }

    const currentIndex = images.value.data!.findIndex(img => img.id === imageId);
    if (currentIndex === -1) {
      return targetImage;
    }

    const isFirstImage = currentIndex === 0;
    if (isFirstImage) {
      const previousPage = currentPage - 1;
      await setPageImages(previousPage);
      if (!images.value.data) {
        return targetImage;
      }
      targetImage.targetPageNumber = previousPage;
      targetImage.targetImageId = images.value.data[images.value.data.length - 1].id;
      return targetImage;
    }
    targetImage.targetPageNumber = currentPage;
    targetImage.targetImageId = images.value.data[currentIndex - 1].id;
    return targetImage;
  }

  async function getNextImage(currentPage: number, imageId: string): Promise<ImageNavigation> {
    const targetImage = {
      targetImageId: null,
      targetPageNumber: null
    } as ImageNavigation;

    if(!images.value.data) {
      try {
        imageDetail.value.loading = true;
        await setPageImages(currentPage);
      } catch {
        return targetImage;
      } finally {
        imageDetail.value.loading = false;
      }
    }

    const currentIndex = images.value.data!.findIndex(img => img.id === imageId);
    if (currentIndex === -1) {
      return targetImage;
    }

    const isLastImage = currentIndex === images.value.data!.length - 1;
    if (isLastImage) {
      const nextPage = currentPage + 1;
      try {
        imageDetail.value.loading = true;
        await setPageImages(nextPage);
      } catch {
        return targetImage;
      } finally {
        imageDetail.value.loading = false;
      }
      targetImage.targetPageNumber = nextPage;
      targetImage.targetImageId = images.value.data![0].id;
      return targetImage;
    }
    targetImage.targetPageNumber = currentPage;
    targetImage.targetImageId = images.value.data![currentIndex + 1].id;
    return targetImage;
  }

  return {
    totalItems,
    pageSize,
    images,
    imageDetail,
    firstImageId,
    lastImageId,
    setPageImages,
    setImageDetail,
    getPreviousImage,
    getNextImage
  };
})
