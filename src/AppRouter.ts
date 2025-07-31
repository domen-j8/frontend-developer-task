import { createRouter, createWebHistory } from 'vue-router'
import galleryRoutes from '@/pages/ImageGallery/routes.ts';
import NotFound from '@/pages/NotFound.vue';

const appRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/gallery' },
    ...galleryRoutes,
    { path: '/:notFound(.*)*', name: 'NotFound', component: NotFound },
  ],
})

export default appRouter;
