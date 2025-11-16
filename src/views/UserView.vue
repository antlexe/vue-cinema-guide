<template>
  <section class="user">
    <div class="container">
      <div class="user__wrapper">
        <h1 class="user__title">Мой аккаунт</h1>
        <nav class="user__nav">
          <RouterLink
            :to="{ name: 'user-favorites' }"
            class="user__link"
            :class="{ 'user__tab--active': $route.name === 'user-favorites' }"
          >
            <IconHeart class="user__link-icon" />
            <span class="user__link-text">Избранные фильмы </span>
            <span class="user__link-text user__link-text--mobile">
              Избранное
            </span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'user-settings' }"
            class="user__link"
            :class="{ 'user__tab--active': $route.name === 'user-settings' }"
          >
            <IconUser class="user__link-icon" />
            <span class="user__link-text">Настройка аккаунта</span>
            <span class="user__link-text user__link-text--mobile">
              Настройки
            </span>
          </RouterLink>
        </nav>
        <router-view />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  // icons
  import IconHeart from '@/components/ui/icons/heart/IconHeart.vue'
  import IconUser from '@/components/ui/icons/IconUser.vue'

  // vue
  import { onMounted } from 'vue'

  // vue-router
  import { useRouter } from 'vue-router'
  const router = useRouter()

  // pinia
  import { useUserStore } from '@/stores/user'
  const userStore = useUserStore()

  // Проверяем авторизацию при загрузке
  onMounted(() => {
    if (!userStore.isAuthenticated) {
      router.push('/')
    }
  })
</script>

<style scoped lang="scss">
  .user {
    padding: 64px 0;

    @include vp-767 {
      padding: 16px 0 40px;
    }

    &__title {
      margin: 0;
      font-weight: 700;
      font-size: 48px;
      line-height: 56px;
      color: $color-white;

      @include vp-767 {
        font-size: 24px;
        line-height: 32px;
      }
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 64px;

      @include vp-767 {
        gap: 40px;
      }
    }

    &__nav {
      display: flex;
      flex-direction: row;
      gap: 64px;

      @include vp-767 {
        gap: 24px;
        position: relative;
        z-index: 1;
      }
    }

    &__link {
      @include flex-center;
      gap: 8px;
      color: $color-white;
      border: none;
      background-color: transparent;
      cursor: pointer;
      transition:
        background-color $transition-300,
        color $transition-300,
        border-color $transition-300;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
      padding: 8px 0px 7px;
      border-bottom: 1px solid transparent;

      &.router-link-active {
        border-bottom: 1px solid $color-heliotrope;
      }

      &:hover,
      &:focus-visible {
        border-bottom: 1px solid $color-heliotrope;
        outline: none;
      }
    }
    &__link-text {
      @include vp-767 {
        display: none;
      }

      &--mobile {
        display: none;

        @include vp-767 {
          display: block;
        }
      }
    }
  }
</style>
