import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGalleryStore } from '@/pages/ImageGallery/store';
import type {ImageNavigation} from '@/pages/ImageGallery/interfaces/ImageNavigation.ts';
import type {Image} from '@/pages/ImageGallery/interfaces/Image.ts';

const imagesData: Image[] = [
  {"id": "0", "author": "Alejandro Escamilla", "width": 5000, "height": 3333, "url": "https://unsplash.com/photos/yC-Yzbqy7PY", "download_url": "https://picsum.photos/id/0/5000/3333", "previewUrl": "https://picsum.photos/id/0/270/250"},
  {"id": "1", "author": "Alejandro Escamilla", "width": 5000, "height": 3333, "url": "https://unsplash.com/photos/LNRyGwIJr5c", "download_url": "https://picsum.photos/id/1/5000/3333", "previewUrl": "https://picsum.photos/id/1/270/250"}
]

describe('Gallery Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  })

  it('should handle navigation to next image correctly', async () => {
    const store = useGalleryStore()
    store.images.data = imagesData;

    const result: ImageNavigation = await store.getNextImage(1, '0');

    expect(result.targetImageId).toBe('1');
    expect(result.targetPageNumber).toBe(1);
  })

  it('should handle navigation to previous image correctly', async () => {
    const store = useGalleryStore()
    store.images.data = imagesData;

    const result: ImageNavigation = await store.getPreviousImage(1, '1');

    expect(result.targetImageId).toBe('0');
    expect(result.targetPageNumber).toBe(1);
  })
})
