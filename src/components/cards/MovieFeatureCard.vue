<template>
  <div class="movie-feature-card">
    <div class="movie-feature-card__content">
      <!-- информация о фильме -->
      <div class="movie-feature-card__top">
        <div class="movie-feature-card__info">
          <MovieRating :value="tmdbRating" />
          <span class="movie-feature-card__year">{{ releaseYear }}</span>
          <span class="movie-feature-card__genre">{{ formattedGenres }}</span>
          <span class="movie-feature-card__time">{{ formattedRuntime }}</span>
        </div>
        <h1 class="movie-feature-card__title">{{ title }}</h1>
        <p class="movie-feature-card__plot">{{ plot }}</p>
      </div>
      <div class="movie-feature-card__bottom">
        <!-- трейлер -->
        <BaseButton
          :class="[
            'movie-feature-card__trailer-btn',
            { 'movie-feature-card__trailer-btn--home': isOnHome },
          ]"
          variant="primary"
          type="button"
          @click="openTrailer"
        >
          Трейлер
        </BaseButton>

        <!-- кнопка для перехода на фильм (если на главной странице) -->
        <BaseButton
          v-if="isOnHome"
          variant="secondary"
          type="button"
          @click="$emit('about-click', movie.id)"
          class="movie-feature-card__about-film-btn"
        >
          О фильме
        </BaseButton>

        <!-- кнопка для добавления в избранное или вход -->
        <FavoriteButton :movie-id="movie.id" />

        <!-- кнопка для обновления фильма (если на главной странице) -->
        <BaseButton
          v-if="isOnHome"
          variant="secondary"
          type="button"
          @click="$emit('refresh-movie')"
          aria-label="Получить новый случайный фильм"
        >
          <IconUpdate />
        </BaseButton>
      </div>
    </div>

    <!-- картинка фильма -->
    <img
      :src="backdropUrl"
      :alt="title"
      :class="[
        'movie-feature-card__image',
        { 'movie-feature-card__image--home': isOnHome },
      ]"
    />

    <!-- модальное окно для трейлера -->
    <MovieTrailer
      v-if="showTrailerModal"
      :title="movie.title"
      :youtube-id="movie.trailerYouTubeId"
      @close="showTrailerModal = false"
    />
  </div>
</template>

<script setup lang="ts">
  // components
  import BaseButton from '@/components/ui/BaseButton.vue'
  import MovieRating from '@/components/ui/MovieRating.vue'
  import MovieTrailer from '@/components/MovieTrailer.vue'
  import FavoriteButton from '@/components/FavoriteButton.vue'

  // icons
  import IconUpdate from '@/components/ui/icons/IconUpdate.vue'

  // vue
  import { computed, ref } from 'vue'

  // types
  import type { Movie } from '@/components/types'

  interface Props {
    movie: Movie
    isOnHome?: boolean
  }

  interface Emits {
    'about-click': [movieId: number]
    'refresh-movie': []
  }

  // emits & props
  const props = defineProps<Props>()
  defineEmits<Emits>()

  // refs
  const showTrailerModal = ref(false)

  const openTrailer = () => {
    showTrailerModal.value = true
  }

  const title = computed(() => props.movie.title)
  const plot = computed(() => props.movie.plot)
  const releaseYear = computed(() => props.movie.releaseYear)
  const tmdbRating = computed(() => props.movie.tmdbRating)
  const backdropUrl = computed(() => props.movie.backdropUrl)
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

<style scoped lang="scss">
  .movie-feature-card {
    display: grid;
    grid-template-columns: 600px 1fr;
    grid-template-columns: minmax(100px, 600px) minmax(100px, 680px);
    align-items: center;

    @media (max-width: 1031px) {
      display: flex;
      flex-direction: column-reverse;
      gap: 24px;
    }

    @include vp-767 {
      display: flex;
      flex-direction: column-reverse;
      gap: 24px;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 60px;

      @include vp-767 {
        gap: 32px;
      }
    }

    &__top {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &__info {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    &__year,
    &__genre,
    &__time {
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
      color: $color-white-70;

      @include vp-767 {
        font-size: 14px;
        line-height: 20px;
      }
    }

    &__title {
      margin: 0;
      font-weight: 700;
      font-size: 48px;
      line-height: 56px;
      color: $color-white;

      @media (max-width: 1240px) {
        font-size: 36px;
        line-height: 42px;
      }

      @include vp-767 {
        font-size: 24px;
        line-height: 32px;
      }
    }

    &__plot {
      margin: 0;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
      color: $color-white-70;

      @media (max-width: 1240px) {
        font-size: 20px;
        line-height: 26px;
      }

      @include vp-767 {
        font-size: 18px;
        line-height: 24px;
      }
    }

    &__bottom {
      display: flex;
      gap: 16px;

      @include vp-767 {
        flex-wrap: wrap;
      }
    }

    &__trailer-btn {
      width: 171px;

      @include vp-767 {
        width: 251px;
      }

      &--home {
        @media (max-width: 577px) {
          width: 100%;
        }
      }
    }

    &__about-film-btn {
      width: 183px;

      @media (max-width: 577px) {
        width: 167px;
      }
    }

    &__image {
      border-radius: 16px;
      background-color: $color-eclipse;
      width: 100%;
      aspect-ratio: 85/69;

      @media (max-width: 1031px) {
        width: 50%;
        min-width: 334px;
      }

      @include vp-767 {
        aspect-ratio: 167/130;
      }

      &--home {
        @include vp-767 {
          aspect-ratio: 13/9;
        }
      }

      &::before {
        @include flex-center;
        min-width: 100%;
        min-height: 100%;
        color: white;
        padding: 10px;
        font-size: 24px;
        line-height: 32px;
        color: $color-white-70;
      }
    }
  }
</style>
