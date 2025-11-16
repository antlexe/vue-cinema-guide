<template>
  <section class="home">
    <div class="container">
      <div class="home__wrapper">
        <!-- случайный фильм -->
        <MovieFeatureCard
        v-if="randomMovie"
        :movie="randomMovie"
        :is-on-home="true"
        @about-click="goToMoviePage"
        @refresh-movie="loadRandomMovie"
        class="home__random-movie"
        />

        <!-- топ 10 фильмов -->
        <div class="home__top">
          <h2 class="home__top-title">Топ 10 фильмов</h2>
          <ul class="home__top-list">
            <li
              class="home__top-item"
              v-for="movie in topMovies"
              :key="movie.id"
            >
              <MovieTopCard :movie="movie" class="home__movie-top-card" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  // components
  import MovieFeatureCard from '@/components/cards/MovieFeatureCard.vue'
  import MovieTopCard from '@/components/cards/MovieTopCard.vue'

  // vue
  import { ref, onMounted } from 'vue'

  // vue-router
  import { useRouter } from 'vue-router'
  const router = useRouter()

  // types
  import type { Movie } from '@/components/types'

  // refs
  const randomMovie = ref<Movie | null>(null)
  const topMovies = ref<Movie[]>([])

  const goToMoviePage = (movieId: number) => {
    router.push(`/movie/${movieId}`)
  }

  const loadRandomMovie = async () => {
    try {
      const response = await fetch(
        'https://cinemaguide.skillbox.cc/movie/random',
      )
      randomMovie.value = await response.json()
    } catch (error) {
      console.error('Ошибка загрузки случайного фильма:', error)
    }
  }

  const loadTopMovies = async () => {
    try {
      const moviesResponse = await fetch(
        'https://cinemaguide.skillbox.cc/movie/top10',
      )
      topMovies.value = await moviesResponse.json()
    } catch (error) {
      console.error('Ошибка загрузки фильмов:', error)
    }
  }

  onMounted(() => {
    loadRandomMovie()
    loadTopMovies()
  })
</script>

<style lang="scss" scoped>
  .home {
    padding: 32px 0 120px;

    @include vp-767 {
      margin: -8px 0 0;
      padding: 0 0 32px;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 40px;

      @include vp-767 {
        gap: 56px;
      }
    }

    &__top {
      display: flex;
      flex-direction: column;
      gap: 64px;

      @include vp-767 {
        gap: 40px;
      }
    }

    &__top-title {
      font-weight: 700;
      font-size: 40px;
      line-height: 48px;
      margin: 0;

      @include vp-767 {
        font-size: 24px;
        line-height: 32px;
      }
    }

    &__top-list {
      counter-reset: count-number;
      margin: 0;
      padding: 0;
      list-style: none;
      gap: 64px 40px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);

      @media (max-width: 1320px) {
        overflow: auto;
        margin: -80px -20px -80px -20px;
        padding: 80px 20px 80px 20px;
      }

      @include vp-767 {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        scrollbar-width: none;
      }
    }

    &__top-item {
      counter-increment: count-number;
      position: relative;
    }

    &__movie-top-card::after {
      content: counter(count-number);
      position: absolute;
      top: -12px;
      left: -12px;
      padding: 8px 24px;
      @include flex-center;
      border-radius: 50px;
      background-color: $color-white;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      color: $color-slate-blue;
    }
  }
</style>
