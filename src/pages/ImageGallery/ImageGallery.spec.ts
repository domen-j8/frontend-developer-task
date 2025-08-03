import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ImageGallery from '@/pages/ImageGallery/ImageGallery.vue';
import router from '@/router.ts';

describe('ImageGallery', () => {

  const createWrapper = () => {
    return mount(ImageGallery, {
      global: {
        plugins: [router]
      }
    })
  }

  beforeEach(async () => {
    setActivePinia(createPinia());
  })

  it('should extract current page from route params', async () => {
    await router.push('/gallery/2');

    const wrapper = createWrapper();
    expect((wrapper.vm as any).currentPage).toBe(2);
  })

})
