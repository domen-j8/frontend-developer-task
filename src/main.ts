import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import appRouter from './AppRouter.ts'

import '@/assets/style/main.scss'


const app = createApp(App)

app.use(createPinia())
app.use(appRouter)

app.mount('#app')
