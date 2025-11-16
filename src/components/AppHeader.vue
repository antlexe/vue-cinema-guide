<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <!-- логотип -->
        <RouterLink
          :to="{ name: 'home' }"
          class="header__logo"
          aria-label="Переход на главную страницу"
        >
          <LogoMarusia />
        </RouterLink>

        <!-- центральная часть -->
        <div class="header__center">
          <!-- ссылка на главную страницу-->
          <RouterLink
            :to="{ name: 'home' }"
            class="header__link header__link--none"
            aria-label="Переход на главную страницу"
          >
            Главная
          </RouterLink>

          <!-- ссылка на страницу с жанрами-->
          <RouterLink
            :to="{ name: 'genres' }"
            class="header__link"
            aria-label="Переход на страницу c жанрами"
          >
            <span class="header__link-text">Жанры</span>
            <IconGenres class="header__link-icon" />
          </RouterLink>

          <!-- десктопная версия поиска -->
          <div class="header__search">
            <form class="header__search-form" @submit.prevent>
              <input
                type="search"
                placeholder="Поиск"
                v-model="searchQuery"
                @focus="openSuggests"
                class="header__search-input"
              />
              <IconSearch class="header__search-icon" />
              <Transition name="clear">
                <button
                  v-if="searchQuery"
                  type="button"
                  @click="clearSearch"
                  class="header__search-clear-btn"
                  aria-label="Очистить поиск"
                >
                  <IconCrossSmall class="header__search-clear-icon" />
                </button>
              </Transition>
            </form>

            <!-- окно с поиском (Десктопная версия поиска) -->
            <SearchSuggests
              :is-open="isSuggestsOpen"
              :search-query="searchQuery"
              @close="closeSuggests"
              class="header__search-suggests"
            />
          </div>
        </div>

        <!-- кнопка для мобильной версии поиска -->
        <button
          @click="openMobileSearch"
          class="header__search-mobile-btn"
          aria-label="Открыть поиск"
        >
          <IconSearch />
        </button>

        <!-- мобильное версия поиска (модальное окно)-->
        <Transition>
          <div
            v-if="isMobileSearchOpen"
            class="header__search-modal"
            @click="closeMobileSearch"
          >
            <div class="header__search header__search--mobile" @click.stop>
              <form class="header__search-form">
                <input
                  type="search"
                  placeholder="Поиск"
                  v-model="searchQuery"
                  @focus="openSuggests"
                  class="header__search-input"
                  ref="mobileSearchInputRef"
                />
                <IconSearch class="header__search-icon" />
                <button
                  type="button"
                  @click="clearSearch"
                  class="header__search-clear-btn"
                  aria-label="Очистить поиск"
                >
                  <IconCrossSmall class="header__search-clear-icon" />
                </button>
              </form>

              <!-- окно с поиском (Мобильное версия поиска) -->
              <SearchSuggests
                :is-open="isSuggestsOpen"
                :search-query="searchQuery"
                @close="closeSuggests"
                class="header__search-suggests"
              />
            </div>
          </div>
        </Transition>

        <!-- кнопка для входа (пользователь не зарегистрирован) -->
        <BaseButton
          v-if="!userStore.isAuthenticated"
          variant="menu"
          class="header__btn"
          @click="openAuthModal"
          aria-label="Открыть модальное окно для входа"
        >
          <span class="header__btn-text">Войти</span>
          <IconUser class="header__btn-icon" />
        </BaseButton>

        <!-- ссылка на страницу пользователя (пользователь зарегистрирован) -->
        <RouterLink
          v-else
          :to="{ name: 'user' }"
          class="header__link"
          aria-label="Перейти в профиль пользователя"
        >
          <span class="header__link-text">{{ userStore.userSurname() }}</span>
          <IconUser class="header__link-icon" />
        </RouterLink>

        <!-- модальное окно для регистрации -->
        <Transition>
          <AppAuth v-if="isAuthModalOpen" @close="closeAuthModal" />
        </Transition>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  // components
  import BaseButton from '@/components/ui/BaseButton.vue'
  import LogoMarusia from '@/components/ui/LogoMarusia.vue'
  import SearchSuggests from '@/components/SearchSuggests.vue'
  import AppAuth from '@/components/auth/AppAuth.vue'

  // icons
  import IconSearch from '@/components/ui/icons/IconSearch.vue'
  import IconCrossSmall from '@/components/ui/icons/cross/IconCrossSmall.vue'
  import IconGenres from '@/components/ui/icons/IconGenres.vue'
  import IconUser from '@/components/ui/icons/IconUser.vue'

  // vue
  import { ref, nextTick } from 'vue'

  // pinia
  import { useUserStore } from '@/stores/user'
  const userStore = useUserStore()

  // refs
  const searchQuery = ref('')
  const isSuggestsOpen = ref(false)
  const isMobileSearchOpen = ref(false)
  const mobileSearchInputRef = ref<HTMLInputElement>()
  const isAuthModalOpen = ref(false)

  const openSuggests = () => {
    isSuggestsOpen.value = true
  }

  const closeSuggests = () => {
    isSuggestsOpen.value = false
  }

  const clearSearch = () => {
    searchQuery.value = ''
    closeSuggests()
  }

  const openMobileSearch = () => {
    isMobileSearchOpen.value = true
    searchQuery.value = ''
    nextTick(() => {
      mobileSearchInputRef.value?.focus()
    })
  }

  const closeMobileSearch = () => {
    isMobileSearchOpen.value = false
    searchQuery.value = ''
    closeSuggests()
  }

  const openAuthModal = () => {
    isAuthModalOpen.value = true
  }

  const closeAuthModal = () => {
    isAuthModalOpen.value = false
  }
</script>

<style lang="scss" scoped>
  .v-enter-active,
  .v-leave-active,
  .clear-enter-active .header__search-clear-icon,
  .clear-leave-active .header__search-clear-icon {
    transition: opacity $transition-300;
  }

  .v-enter-from,
  .v-leave-to,
  .clear-enter-from .header__search-clear-icon,
  .clear-leave-to .header__search-clear-icon {
    opacity: 0;
  }

  .header {
    padding: 24px 0;

    @include vp-767 {
      padding: 16px 0;
    }

    &__wrapper {
      display: grid;
      grid-template-columns: 143px 1fr min-content;
      align-items: center;
      gap: 80px;

      @include vp-767 {
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
    }

    &__logo {
      position: relative;
      width: 143px;
      height: 32px;

      @include vp-767 {
        display: flex;
        align-items: center;
        width: 81px;
        margin-right: auto;
      }

      &::before {
        content: '';
        width: 136px;
        height: 1px;
        background-color: transparent;
        position: absolute;
        bottom: -8px;
        left: 7px;
        transition: background-color $transition-300;

        @include vp-767 {
          display: none;
        }
      }

      &:hover,
      &:focus-visible {
        outline: none;

        &::before {
          background-color: $color-heliotrope;
        }
      }
    }

    &__center {
      display: grid;
      grid-template-columns: repeat(2, min-content) 1fr;
      align-items: center;
      gap: 40px;

      @media (max-width: 930px) {
        grid-template-columns: min-content 1fr;
      }

      @include vp-767 {
        display: block;
      }
    }

    // link
    &__link {
      @include flex-center;
      background-color: transparent;
      padding: 8px 0px 7px;
      border-bottom: 1px solid transparent;
      color: $color-white;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
      cursor: pointer;
      transition:
        background-color $transition-300,
        color $transition-300,
        border-color $transition-300;

      @media (max-width: 803px) {
        padding: 0;
        border-bottom: unset;
      }

      &:hover,
      &:focus-visible {
        border-bottom: 1px solid $color-heliotrope;
        outline: none;

        @media (max-width: 803px) {
          border-bottom: unset;
        }

      }

      &--none {
        @media (max-width: 930px) {
          display: none;
        }
      }

      &.router-link-active {
        border-bottom: 1px solid $color-heliotrope;

        @media (max-width: 803px) {
          border-bottom: unset;
        }

      }
    }
    &__link-text {
      @media (max-width: 803px) {
        display: none;
      }
      @include vp-767 {
        display: none;
      }
    }
    &__link-icon {
      display: none;

      @media (max-width: 803px) {
        display: block;
      }

    }

    // search
    &__search {
      position: relative;

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
    &__search-input {
      border: 1px solid $color-montana;
      border-radius: 8px;
      padding: 11px 52px;
      width: 100%;
      background-color: $color-montana;
      color: $color-white;
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
      transition: border-color $transition-300;

      @include vp-767 {
        padding: 15px 52px;
      }

      &:hover,
      &:focus-visible {
        border-color: $color-perana;
        outline: none;

        & + .header__search-icon {
          color: $color-perana;
        }
      }
    }
    &__search-icon {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
      pointer-events: none;
      transition: color $transition-300;
      color: $color-white-50;
    }
    &__search-clear-btn {
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      background-color: transparent;
      border: none;
      padding: 0;
      @include flex-center;
      color: $color-white-50;
      cursor: pointer;
      transition: color $transition-300;

      @include vp-767 {
        color: $color-white;
      }

      &:hover,
      &:focus-visible {
        outline: none;
        color: $color-white;
      }
    }
    &__search-mobile-btn {
      display: none;

      @include vp-767 {
        @include flex-center;
        background-color: transparent;
        border: none;
        padding: 0;
        color: $color-white;
        cursor: pointer;
      }
    }
    &__search-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      padding: 16px 20px;

      display: none;

      @include vp-767 {
        display: block;
      }
    }

    // btn
    &__btn-text {
      @include vp-767 {
        display: none;
      }
    }
    &__btn-icon {
      display: none;

      @include vp-767 {
        display: block;
      }
    }
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
</style>
