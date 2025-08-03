import { describe, it, expect } from 'vitest';
import {mount} from '@vue/test-utils';
import BasePaginator from '@/shared/components/BasePaginator.vue';

describe('BasePaginator', () => {
  it('should calculate page entries correctly', () => {
    const wrapper = mount(BasePaginator, {
      props: { totalItems: 100, pageSize: 20, pageNumber: 3 }
    })

    expect(wrapper.text()).toContain('41 - 60 of 100');
  })

  it('should calculate page number', () => {
    const wrapper = mount(BasePaginator, {
      props: { totalItems: 120, pageSize: 20, pageNumber: 3 }
    })

    expect(wrapper.text()).toContain('123456');
  })

  it('should emit page change when clicking page number', async () => {
    const wrapper = mount(BasePaginator, {
      props: { totalItems: 100, pageSize: 20, pageNumber: 1 }
    })

    await wrapper.find('.page-number-container').trigger('click');
    expect(wrapper.emitted('pageChange')).toBeTruthy();
  })

  it('should disable previous button on first page', () => {
    const wrapper = mount(BasePaginator, {
      props: { totalItems: 100, pageSize: 20, pageNumber: 1 }
    })

    const prevIcon = wrapper.find('.previous .icon');
    expect(prevIcon.classes()).toContain('disabled');
  })
})
