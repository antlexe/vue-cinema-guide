<template>
  <div :class="['rating', `rating--${size}`, `rating--${ratingColor}`]">
    <component :is="starComponent" class="rating__star"></component>
    <span class="rating__value">
      {{ displayValue }}
    </span>
  </div>
</template>

<script setup lang="ts">
  // icons
  import IconStarLarge from '@/components/ui/icons/star/IconStarLarge.vue'
  import IconStarSmall from '@/components/ui/icons/star/IconStarSmall.vue'

  // vue
  import { computed } from 'vue'

  // types
  interface Props {
    value: number
    size?: 'default' | 'small'
  }

  // props
  const props = withDefaults(defineProps<Props>(), {
    size: 'default',
  })

  const ratingColor = computed(() => {
    const value = props.value

    if (value >= 8) return 'excellent'
    if (value >= 7) return 'good'
    if (value >= 6) return 'average'
    return 'poor'
  })

  const starComponent = computed(() =>
    props.size === 'small' ? IconStarSmall : IconStarLarge,
  )

  const displayValue = computed(() => props.value.toFixed(1))
</script>

<style scoped lang="scss">
  .rating {
    @include flex-center;
    gap: 4px;
    border-radius: 16px;

    &--default {
      width: 70px;
      height: 32px;
    }

    &--small {
      width: 47px;
      height: 20px;

      .rating__value {
        font-size: 12px;
      }
    }

    &--excellent {
      background-color: $color-lucky;
    }
    &--good {
      background-color: $color-forest-green;
    }
    &--average {
      background-color: $color-grey;
    }
    &--poor {
      background-color: $color-fire-brick;
    }

    &__value {
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
      color: $color-white;
    }
  }
</style>
