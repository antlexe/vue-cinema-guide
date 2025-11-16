<template>
  <RouterLink
    :to="{ name: 'movie', params: { movieId: `${movie.id}` } }"
    class="movie-search-card"
  >
    <img :src="posterUrl" :alt="title" class="movie-search-card__image" />
    <div class="movie-search-card__content">
      <div class="movie-search-card__top">
        <MovieRating :value="tmdbRating" size="small" />
        <span class="movie-search-card__year">{{ releaseYear }}</span>
        <span class="movie-search-card__genre">{{ formattedGenres }}</span>
        <span class="movie-search-card__time">{{ formattedRuntime }}</span>
      </div>
      <p class="movie-search-card__title">{{ title }}</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
  // components
  import MovieRating from '@/components/ui/MovieRating.vue'

  // vue
  import { computed } from 'vue'

  // vue-router
  import { RouterLink } from 'vue-router'

  // types
  import type { Movie } from '@/components/types'

  interface Props {
    movie: Movie
  }

  // props
  const props = defineProps<Props>()

  const posterUrl = computed(() => props.movie.posterUrl)
  const tmdbRating = computed(() => props.movie.tmdbRating)
  const releaseYear = computed(() => props.movie.releaseYear)
  const title = computed(() => props.movie.title)
  const formattedGenres = computed(() => props.movie.genres.join(', '))
  const formattedRuntime = computed(() => {
    const hours = Math.floor(props.movie.runtime / 60)
    const minutes = props.movie.runtime % 60

    if (hours > 0) {
      return `${hours} ч ${minutes} мин`
    }
    return `${minutes} мин`
  })
</script>

<style lang="scss" scoped>
  .movie-search-card {
    padding: 19px 8px;
    display: flex;
    flex-direction: row;
    gap: 16px;
    border: 1px solid transparent;
    border-radius: 6px;
    transition: border-color $transition-300;

    @include vp-1023 {
      flex-direction: column;
      padding: 0;
      border: unset;
      width: 220px;
      flex-shrink: 0;
    }

    &:hover,
    &:focus-visible {
      outline: none;
      border-color: $color-white-50;

      @include vp-1023 {
        border-color: unset;
        outline: 1px solid $color-white-50;
      }
    }

    &__image {
      width: 40px;
      height: 52px;
      background-color: $color-granite-gray;

      @include vp-1023 {
        width: 158px;
        height: 206px;
      }

      &::before {
        display: none;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__top {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    &__year,
    &__genre,
    &__time {
      font-size: 14px;
      line-height: 20px;
      color: $color-white-70;
    }

    &__title {
      margin: 0;
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
      color: $color-white;
    }
  }
</style>
