import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import App from './App.vue';
import router from '@/router';

describe('App', () => {
  const createWrapper = () => {
    return mount(App, {
      global: {
        plugins: [router]
      }
    })
  }

  it('renders the main app structure correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.app-container').exists()).toBe(true);
    expect(wrapper.find('.header').exists()).toBe(true);
    expect(wrapper.find('main').exists()).toBe(true);
  })
})
