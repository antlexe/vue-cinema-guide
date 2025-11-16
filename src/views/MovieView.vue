<template>
  <section class="movie">
    <div class="container">
      <MovieFeatureCard
        v-if="movie"
        :movie="movie"
        class="movie__card"
      />
      <MovieAboutCard v-if="movie" :movie="movie" class="movie__about" />
    </div>
  </section>
</template>

<script setup lang="ts">
  // components
  import MovieAboutCard from '@/components/cards/MovieAboutCard.vue'
  import MovieFeatureCard from '@/components/cards/MovieFeatureCard.vue'

  // vue
  import { onMounted, ref } from 'vue'

  // vue-router
  import { useRoute } from 'vue-router'
  const route = useRoute()

  // types
  import type { Movie } from '@/components/types'

  // refs
  const movie = ref<Movie>()

  const movieInfo = async () => {
    try {
      const response = await fetch(
        `https://cinemaguide.skillbox.cc/movie/${route.params.movieId}`,
      )
      movie.value = await response.json()
    } catch (error) {
      console.error('Ошибка загрузки фильма:', error)
    }
  }

  onMounted(() => {
    movieInfo()
  })
</script>

<style lang="scss" scoped>
  .movie {
    padding: 32px 0 0;

    @include vp-767 {
      margin: -8px 0 0;
      padding: unset;
    }
  }
</style>
