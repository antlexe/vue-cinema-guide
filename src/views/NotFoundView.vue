<template>
  <section class="not-found">
    <div class="container">
      <div class="not-found__wrapper">
        <h1 class="not-found__title">Страница не найдена</h1>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .not-found {
    padding: 64px 0;
    &__wrapper {
      @include flex-center;
    }

    &__title {
      margin: 0;
      font-size: 48px;
      line-height: 56px;

      @include vp-767 {
        font-size: 24px;
        line-height: 32px;
      }
    }
  }
</style>
