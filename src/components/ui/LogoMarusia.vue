<template>
  <img
    :src="logoSrc"
    alt="Логотип Маруся"
    :class="['logo', `logo--${variant}`]"
  />
</template>

<script setup lang="ts">
  // images
  import logoWhite from '@/assets/images/logo/marusia-white.png'
  import logoBlack from '@/assets/images/logo/marusia-black.png'
  // vue
  import { computed } from 'vue'
  // types
  type LogoVariant = 'default' | 'dark'

  interface Props {
    variant?: LogoVariant
  }
  // props
  const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
  })

  const logoSrc = computed(() =>
    props.variant.includes('dark') ? logoBlack : logoWhite,
  )
</script>
