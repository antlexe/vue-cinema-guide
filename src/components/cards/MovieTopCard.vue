<template>
  <RouterLink
    :to="{ name: 'movie', params: { movieId: `${movie.id}` } }"
    class="movie-top-card"
  >
    <img
      :src="movie.posterUrl"
      :alt="movie.title"
      class="movie-top-card__poster"
    />
  </RouterLink>
</template>

<script setup lang="ts">
  // types
  import type { Movie } from '@/components/types'

  interface Props {
    movie: Movie
  }

  // props
  defineProps<Props>()
</script>

<style scoped lang="scss">
  .movie-top-card {
    display: block;
    width: 224px;
    height: 336px;
    background-color: $color-eclipse;
    box-shadow: 0px 0px 80px 0px $color-white-33;
    border: 1px solid $color-white-25;
    border-radius: 16px;
    transition: opacity $transition-300;

    &:hover,
    &:focus-visible {
      outline: none;
      opacity: 0.5;
    }

    &__poster {
      border-radius: 16px;
      height: 100%;
      width: 100%;

      &::before {
        @include flex-center;
        min-width: 100%;
        min-height: 100%;
        color: white;
        padding: 10px;
      }
    }
  }
</style>
