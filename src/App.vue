<template>
  <AppHeader />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" v-if="!isPageLoading" key="router-content" />
        <PageLoader v-else key="page-loader" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
  // components
  import AppFooter from '@/components/AppFooter.vue'
  import AppHeader from '@/components/AppHeader.vue'
  import PageLoader from '@/components/PageLoader.vue'

  // vue
  import { ref } from 'vue'

  // vue-router
  import { useRouter } from 'vue-router'
  const router = useRouter()

  // refs
  const isPageLoading = ref(false)

  router.beforeEach(() => {
    isPageLoading.value = true
  })
  router.afterEach(() => {
    isPageLoading.value = false
  })
</script>

<style lang="scss" scoped>
  .page-enter-active,
  .page-leave-active {
    transition:
      opacity $transition-300,
      transform $transition-300;
  }

  .page-enter-from {
    opacity: 0;
    transform: translateX(-10px);
  }

  .page-leave-to {
    opacity: 0;
    transform: translateX(10px);
  }
</style>
