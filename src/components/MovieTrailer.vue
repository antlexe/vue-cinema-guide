<template>
  <div class="movie-trailer">
    <div class="movie-trailer__wrapper">
      <!-- кнопка закрыть модальное окно с трейлером -->
      <button class="movie-trailer__close-btn" @click="closeModal">
        <component
          :is="isMobile ? IconCrossSmall : IconCrossLarge"
          class="close-icon"
        />
      </button>
      <!-- трейлер -->
      <div class="movie-trailer__trailer-wrapper">
        <iframe
          v-if="youtubeId"
          :src="embedUrl"
          class="movie-trailer__trailer-video"
          :title="title"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          @load="onVideoLoaded"
        ></iframe>

        <!-- загрузка трейлер -->
        <div v-if="!isVideoLoaded" class="movie-trailer__trailer-loading">
          <IconLoader class="movie-trailer__trailer-loading-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // icons
  import IconCrossSmall from '@/components/ui/icons/cross/IconCrossSmall.vue'
  import IconCrossLarge from '@/components/ui/icons/cross/IconCrossLarge.vue'
  import IconLoader from '@/components/ui/icons/IconLoader.vue'

  // vue
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  // types
  interface Props {
    title: string
    youtubeId: string
  }

  // props & emits
  const props = defineProps<Props>()
  const emit = defineEmits<{
    close: []
  }>()

  // refs
  const isVideoLoaded = ref(false)
  const isMobile = ref(false)

  const embedUrl = computed(() => {
    if (!props.youtubeId) return ''
    return `https://www.youtube.com/embed/${props.youtubeId}?autoplay=1`
  })

  const closeModal = () => {
    emit('close')
  }

  const onVideoLoaded = () => {
    isVideoLoaded.value = true
  }

  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
  }

  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })
</script>

<style scoped lang="scss">
  .movie-trailer {
    position: fixed;
    inset: 0 0 0 0;
    z-index: 1000;
    @include flex-center;
    background: $color-vampire-black-90;

    &__wrapper {
      position: relative;
      background: transparent;
      display: flex;
      flex-direction: column;
      max-width: 960px;
      width: 100%;
      aspect-ratio: 16/9;
    }

    &__close-btn {
      position: absolute;
      top: 0;
      left: calc(100% + 24px);
      z-index: 10;
      @include flex-center;
      width: 48px;
      height: 48px;
      background: $color-white;
      border: none;
      border-radius: 50%;
      color: $color-black;
      cursor: pointer;

      @include vp-767 {
        left: unset;
        right: 0px;
      }
    }

    &__trailer-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      background: $color-montana;
      flex-grow: 1;
    }

    &__trailer-video {
      border: none;
      position: absolute;
      height: 100%;
      width: 100%;
    }

    &__trailer-loading {
      @include flex-center;
      color: $color-white;
      background: $color-montana;
      flex-grow: 1;
    }

    &__trailer-loading-icon {
      animation: loadingRotate 2s linear infinite;
    }
  }

 
</style>
