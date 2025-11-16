<template>
  <div class="page-loader">
    <IconLoader class="page-loader__icon" />
    <span class="page-loader__text">Загрузка...</span>
  </div>
</template>

<script setup lang="ts">
  import IconLoader from '@/components/ui/icons/IconLoader.vue'
</script>

<style scoped lang="scss">
  .page-loader {
    @include flex-center;
    min-height: calc(100vh - 96px - 120px);

    @include vp-767 {
      min-height: calc(100vh - 64px - 84px);
    }

    &__icon {
      width: 48px;
      height: 48px;
      animation: loadingRotate 2s linear infinite;
      color: $color-white;
    }

    &__text {
      color: $color-white;
      font-size: 18px;
      line-height: 24px;
    }
  }
</style>
