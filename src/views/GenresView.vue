<template>
  <section class="genres">
    <div class="container">
      <h1 class="genres__title">Жанры фильмов</h1>
      <ul class="genres__list">
        <li class="genres__item" v-for="genre in genres" :key="genre">
          <GenreCard :genre="genre" class="genres__item-card" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
  // components
  import GenreCard from '@/components/cards/GenreCard.vue'

  // vue
  import { ref, onMounted } from 'vue'

  // refs
  const genres = ref<string[]>([])

  const loadGenres = async () => {
    try {
      const response = await fetch(
        'https://cinemaguide.skillbox.cc/movie/genres',
      )
      genres.value = await response.json()
    } catch (error) {
      console.error('Ошибка загрузки жанров:', error)
    }
  }

  onMounted(() => {
    loadGenres()
  })
</script>

<style lang="scss" scoped>
  .genres {
    padding: 64px 0 160px;

    @include vp-767 {
      padding: 16px 0 40px;
    }

    &__title {
      margin: 0;
      font-weight: 700;
      font-size: 48px;
      line-height: 56px;
      margin-bottom: 64px;

      @media (max-width: 644px) {
        font-size: 24px;
        line-height: 32px;
        margin-bottom: 40px;
      }
    }

    &__list {
      margin: 0;
      padding: 0;
      list-style: none;
      gap: 64px 40px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-content: center;

      @media (max-width: 1123px) {
        grid-template-columns: repeat(3, 290px);
      }

      @media (max-width: 992px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }

      @include vp-767 {
        grid-template-columns: repeat(2, 290px);
      }

      @media (max-width: 644px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
      }
    }
  }
</style>
