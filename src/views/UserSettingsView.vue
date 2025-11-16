<template>
  <div class="user-settings">
    <ul class="user-settings__list">
      <li class="user-settings__item">
        <div class="user-settings__item-marker">
          <span>{{ userInitials }}</span>
        </div>
        <div class="user-settings__item-wrapper">
          <p class="user-settings__title">Имя фамилия</p>
          <p class="user-settings__text">{{ userFullName }}</p>
        </div>
      </li>
      <li class="user-settings__item">
        <div class="user-settings__item-marker">
          <IconMail />
        </div>
        <div class="user-settings__item-wrapper">
          <p class="user-settings__title">Электронная почта</p>
          <p class="user-settings__text">{{ userEmail }}</p>
        </div>
      </li>
    </ul>

    <BaseButton
      variant="primary"
      @click="handleLogout"
      class="user-settings__logout-btn"
    >
      Выйти из аккаунта
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  // components
  import BaseButton from '@/components/ui/BaseButton.vue'

  // icons
  import IconMail from '@/components/ui/icons/IconMail.vue'

  // vue
  import { computed } from 'vue'

  // vue-router
  import { useRouter } from 'vue-router'
  const router = useRouter()

  // pinia
  import { useUserStore } from '@/stores/user'
  const userStore = useUserStore()

  const userFullName = computed(() => {
    return userStore.userFullName() || 'Не указано'
  })

  const userEmail = computed(() => {
    return userStore.user?.email || 'Не указано'
  })

  const userInitials = computed(() => {
    return userStore.userInitials() || '?'
  })

  const handleLogout = async () => {
    try {
      await userStore.logout()
      router.push('/')
    } catch (error) {
      console.error('Ошибка выхода:', error)
    }
  }
</script>

<style scoped lang="scss">
  .user-settings {
    display: flex;
    flex-direction: column;
    gap: 64px;

    @include vp-767 {
      gap: 40px;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 40px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__item {
      display: flex;
      flex-direction: row;
      gap: 16px;
    }

    &__item-marker {
      @include flex-center;
      background-color: $color-white-50;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      color: $color-white;
      flex-shrink: 0;

      @include vp-767 {
        width: 48px;
        height: 48px;
      }
    }

    &__item-wrapper {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    &__title {
      margin: 0;
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
      color: $color-white;

      @include vp-767 {
        font-size: 14px;
        line-height: 20px;
        color: $color-white-50;
      }
    }

    &__text {
      margin: 0;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      color: $color-white;

      @include vp-767 {
        font-size: 18px;
        line-height: 24px;
      }
    }

    &__logout-btn {
      max-width: 262px;

      @include vp-767 {
        max-width: unset;
      }
    }
  }
</style>
