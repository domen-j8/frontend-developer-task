import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils'
import ImageDetails from '@/pages/ImageGallery/pages/ImageDetails.vue'
import { useGalleryStore } from '../store'
import router from '@/router.ts';
import {createPinia, setActivePinia} from 'pinia';

describe('ImageDetails', () => {

  const createWrapper = () => {
    return mount(ImageDetails, {
      global: {
        plugins: [router]
      }
    })
  }

  beforeEach(async () => {
    setActivePinia(createPinia())
  });

  it('should call setImageDetail on route change', async () => {
    const spy = vi.spyOn(useGalleryStore(), 'setImageDetail');
    await router.push('/gallery/1/image-details/8');
    createWrapper();

    expect(spy).toHaveBeenCalledWith(1, '8');
  })

})
