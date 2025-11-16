<template>
  <RouterLink
    :to="{ name: 'genre', params: { genre: `${genre}` } }"
    class="genre-card"
  >
    <div class="genre-card__top">
      <img :src="genreImage" :alt="russianName" class="genre-card__image" />
    </div>
    <div class="genre-card__bottom">
      <span class="genre-card__name">{{ russianName }}</span>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
  // vue
  import { computed } from 'vue'

  // types
  import { genreMap } from '@/components/types'

  interface Props {
    genre: string
  }

  // props
  const props = defineProps<Props>()

  const russianName = computed(() => genreMap[props.genre] || props.genre)
  const genreImage = computed(
    () =>
      new URL(`/src/assets/images/genres/${props.genre}.jpg`, import.meta.url)
        .href,
  )
</script>

<style scoped lang="scss">
  .genre-card {
    display: block;
    border-radius: 24px;
    box-shadow: 0px 0px 80px 0px $color-white-33;
    border: 1px solid $color-white-25;
    overflow: hidden;
    aspect-ratio: 145/152;
    max-width: 290px;

    // @include vp-767 {
    //   aspect-ratio: 335/304;
    //   max-width: 335px;
    // }
    @media (max-width: 644px) {
      aspect-ratio: 335/304;
      max-width: 335px;
    }

    &:hover,
    &:focus-visible {
      outline: none;

      .genre-card__name {
        color: $color-black;
      }
      .genre-card__bottom {
        background-color: $color-white;
      }
    }

    &__top {
      height: 72%;
      background-color: $color-granite-gray;
      overflow: hidden;
      object-position: top;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 20%;
    }

    &__bottom {
      height: 28%;
      background-color: $color-black;
      @include flex-center;
      transition: background-color $transition-300;
    }

    &__name {
      color: $color-white;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      text-align: center;
      color: $color-white;
      transition: color $transition-300;
    }
  }
</style>
