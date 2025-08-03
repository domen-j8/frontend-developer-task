<template>
  <div class="paginator-container">
    <div class="current-items">
      {{ pageFirstEntry }} - {{ pageLastEntry }} of {{ totalItems }}
    </div>
    <div class="pages">
      <div class="previous" @click="previousPage">
        <base-icon class="caret-left" :icon-path="caretLeftIcon" :height="'16px'" :disabled="firstPage"/>
      </div>
      <div v-for="page in numberOfPages" :key="page">
        <div @click="pageChange(page)"
             class="page-number-container"
             :class="{ active: page === pageNumber }">
          {{ page }}
        </div>
      </div>
      <div class="next" @click="nextPage">
        <base-icon class="caret-right" :icon-path="caretRightIcon" :width="'16px'" :disabled="lastPage"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, type ComputedRef} from 'vue';
import caretLeftIcon from '@/assets/img/caret-left-regular.svg'
import caretRightIcon from '@/assets/img/caret-right-regular.svg'
import BaseIcon from '@/shared/components/BaseIcon.vue';

const props = defineProps<{
  totalItems: number;
  pageSize: number;
  pageNumber: number;
}>();

const emit = defineEmits<{
  (e: 'pageChange', page: number): void;
}>();

const numberOfPages = computed(() => Math.ceil(props.totalItems / props.pageSize));
const pageFirstEntry = computed(() => {
  return (props.pageNumber - 1) * props.pageSize + 1;
});
const pageLastEntry = computed(() => {
  let lastEntry = props.pageNumber * props.pageSize;
  if (lastEntry > props.totalItems) {
    lastEntry = props.totalItems;
  }
  return lastEntry;
});
const firstPage: ComputedRef<boolean> = computed(() => props.pageNumber === 1);
const lastPage: ComputedRef<boolean> = computed(() => props.pageNumber === numberOfPages.value);

function previousPage() {
  if (!firstPage.value) {
    emit('pageChange', props.pageNumber - 1);
  }
}

function nextPage() {
  if (!lastPage.value) {
    emit('pageChange', props.pageNumber + 1);
  }
}

function pageChange(page: number) {
  emit('pageChange', page);
}

</script>

<style scoped lang="scss">
@use "@/assets/style/variables" as var;

.paginator-container {
  --padding-block: 10px;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  gap: 10px;
  padding-inline: 15px;

  .current-items {
    color: var(--colors-base2);
    padding-block: var(--padding-block);
  }

  .pages {
    display: flex;
    align-items: center;
    gap: 2px;
    justify-content: center;

    .previous, .next {
      display: flex;
      justify-content: center;
      cursor: pointer;
      padding: var(--padding-block);
    }

    .page-number-container {
      padding-inline: 7px;
      cursor: pointer;

      &.active {
        --active-color: #528cff;
        color: var(--active-color);
        border: 1px solid var(--active-color);
        border-radius: 5px;
      }
    }
  }
}

@media (min-width: var.$tablet-screen-breakpoint) {
  .paginator-container {
    justify-content: space-between;
    flex-direction: row;
  }
}
</style>
