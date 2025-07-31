const galleryRoutes = [
  {
    path: '/gallery',
    component: () => import('./ImageGallery.vue'),
    children: [
      {
        path: 'image-details',
        component: import('./pages/ImageDetails.vue')
      }
    ]
  }
]

export default galleryRoutes;
