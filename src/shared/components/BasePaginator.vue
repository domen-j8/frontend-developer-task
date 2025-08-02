<template>
  <div class="paginator-container">
    <div class="current-items">
      {{ pageFirstEntry }} - {{ pageLastEntry }} of {{ totalItems }}
    </div>
    <div class="pages">
      <base-icon @click="previousPage" :icon-path="caretLeftIcon" :width="'20px'" :disabled="firstPage"/>
      <div v-for="page in numberOfPages">
        <div @click="pageChange(page)"
             class="page-number-container"
             :class="{ active: page === pageNumber }">
          {{ page }}
        </div>
      </div>
      <base-icon @click="nextPage" :icon-path="caretRightIcon" :width="'20px'" :disabled="lastPage"/>
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
.paginator-container {
  display: flex;

  .pages {
    display: flex;

    .page-number-container {
      padding-inline: 5px;
      cursor: pointer;

      &.active {
        border: 1px solid black;
      }
    }
  }
}
</style>
