<template>
  <div class="movie-about-card">
    <h2 class="movie-about-card__title">О фильме</h2>
    <ol class="movie-about-card__list">
      <li class="movie-about-card__item">
        <div class="movie-about-card__wrapper">
          <span class="movie-about-card__property">Язык оригинала</span>
        </div>
        <span class="movie-about-card__text">{{ formattedLanguage }}</span>
      </li>
      <li class="movie-about-card__item" v-if="movie.budget">
        <div class="movie-about-card__wrapper">
          <span class="movie-about-card__property">Бюджет</span>
        </div>
        <span class="movie-about-card__text">{{ formattedBudget }}</span>
      </li>
      <li class="movie-about-card__item" v-if="movie.revenue">
        <div class="movie-about-card__wrapper">
          <span class="movie-about-card__property">Выручка</span>
        </div>
        <span class="movie-about-card__text">{{ formattedRevenue }}</span>
      </li>
      <li class="movie-about-card__item" v-if="movie.director">
        <div class="movie-about-card__wrapper">
          <span class="movie-about-card__property">Режиссёр</span>
        </div>
        <span class="movie-about-card__text">{{ movie.director }}</span>
      </li>
      <li class="movie-about-card__item" v-if="movie.production">
        <div class="movie-about-card__wrapper">
          <span class="movie-about-card__property">Продюсер</span>
        </div>
        <span class="movie-about-card__text">{{ movie.production }}</span>
      </li>
      <li class="movie-about-card__item" v-if="movie.awardsSummary">
        <div class="movie-about-card__wrapper">
          <span class="movie-about-card__property">Награды</span>
        </div>
        <span class="movie-about-card__text">{{ movie.awardsSummary }}</span>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
  // vue
  import { computed } from 'vue'

  // types
  import type { Movie } from '@/components/types'
  import { languageMap } from '@/components/types'

  interface Props {
    movie: Movie
  }

  // props
  const props = defineProps<Props>()

  const formattedBudget = computed(() => formatCurrency(props.movie.budget))
  const formattedRevenue = computed(() => formatCurrency(props.movie.revenue))
  const formattedLanguage = computed(
    () => languageMap[props.movie.language] || 'Язык не определен',
  )
  const formatCurrency = (value: string | undefined): string => {
    if (!value) return ''

    const number = parseInt(value)
    if (isNaN(number)) return value

    return `${number.toLocaleString('ru-RU')} $`
  }
</script>

<style scoped lang="scss">
  .movie-about-card {
    display: flex;
    flex-direction: column;
    gap: 64px;
    padding: 40px 0;

    @include vp-767 {
      padding: 56px 0 32px;
      gap: 40px;
    }

    &__title {
      margin: 0;
      font-weight: 700;
      font-size: 40px;
      line-height: 48px;

      @include vp-767 {
        font-size: 24px;
        line-height: 32px;
      }
    }

    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 24px;

      @include vp-767 {
        gap: 12px;
      }
    }

    &__item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: 8px;

      @include vp-767 {
        flex-direction: column;
        gap: 4px;
      }
    }

    &__wrapper {
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 8px;
      width: 320px;

      @include vp-767 {
        display: block;
        width: unset;
      }

      &::after {
        content: '';
        display: block;
        height: 19px;
        width: 100%;
        border-bottom: 1px dashed $color-white-50;

        @include vp-767 {
          display: none;
        }
      }
    }

    &__property {
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;

      @include vp-767 {
        font-size: 14px;
        line-height: 20px;
        color: $color-white-50;
      }
    }

    &__text {
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
    }
  }
</style>
