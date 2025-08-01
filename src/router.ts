import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/gallery'
    },
    {
      path: '/gallery/:page?',
      name: 'Gallery',
      component: () => import('./pages/ImageGallery/ImageGallery.vue'),
    },
    {

      path: '/gallery/:page/image-details/:id',
      name: 'ImageDetails',
      component: () => import('./pages/ImageGallery/pages/ImageDetails.vue'),
    },
    {
      path: '/:notFound(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ],
})

export default router;
