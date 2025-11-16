<template>
  <Transition>
    <div class="search-suggests" v-if="isOpen && searchQuery">
      <!-- поиск -->
      <div v-if="isLoading" class="search-suggests__loading">Поиск...</div>

      <!-- список фильмов -->
      <ul
        v-else-if="searchResults.length > 0"
        class="search-suggests__results-list"
      >
        <li
          class="search-suggests__results-item"
          v-for="movie in searchResults"
          :key="movie.id"
        >
          <MovieSearchCard :movie="movie" @click="closeSuggests" />
        </li>
      </ul>

      <!-- фильм отсутствует -->
      <div v-else class="search-suggests__empty">Фильм не найден</div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  // components
  import MovieSearchCard from '@/components/cards/MovieSearchCard.vue'

  // vue
  import { ref, watch } from 'vue'

  // types
  import type { Movie } from '@/components/types'

  interface Props {
    isOpen: boolean
    searchQuery: string
  }

  // emits & props
  const props = defineProps<Props>()
  const emit = defineEmits<{
    close: []
  }>()

  // refs
  const searchResults = ref<Movie[]>([])
  const isLoading = ref(false)

  const closeSuggests = () => {
    emit('close')
  }

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      searchResults.value = []
      return
    }

    isLoading.value = true

    try {
      const response = await fetch(
        `https://cinemaguide.skillbox.cc/movie?count=5&title=${encodeURIComponent(query)}`,
      )

      if (response.ok) {
        searchResults.value = await response.json()
      } else {
        searchResults.value = []
      }
    } catch (error) {
      console.error('Ошибка поиска:', error)
      searchResults.value = []
    } finally {
      isLoading.value = false
    }
  }

  watch(
    () => props.searchQuery,
    (newQuery) => {
      if (props.isOpen) {
        searchMovies(newQuery)
      }
    },
  )

  watch(
    () => props.isOpen,
    (isOpen) => {
      if (isOpen && props.searchQuery) {
        searchMovies(props.searchQuery)
      } else {
        searchResults.value = []
      }
    },
  )
</script>

<style scoped lang="scss">
  .v-enter-active,
  .v-leave-active {
    transition: opacity $transition-300;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .search-suggests {
    position: absolute;
    top: 100%;
    right: 0;
    max-width: 559px;
    width: 100%;
    background: $color-montana;
    border-radius: 8px;
    z-index: 1000;
    margin-top: 12px;
    padding: 8px;

    @include vp-1023 {
      max-width: unset;
      margin-top: 8px;
      padding: 24px 20px;
    }

    &__loading {
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
      color: $color-white;
    }

    &__empty {
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
      color: $color-white;
    }

    &__results-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;

      @include vp-1023 {
        flex-direction: row;
        gap: 16px;
        overflow: auto;
        margin: -24px -20px;
        padding: 24px 20px;
      }
    }
  }
</style>
