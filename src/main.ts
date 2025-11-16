import '@/assets/scss/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// Проверяем авторизацию при загрузке приложения
import { useUserStore } from '@/stores/user'

// Дожидаемся готовности роутера и затем проверяем авторизацию
router.isReady().then(() => {
  const userStore = useUserStore()
  userStore.checkAuth()
})

app.mount('#app')
