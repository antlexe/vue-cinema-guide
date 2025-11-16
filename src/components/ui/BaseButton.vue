<template>
  <button
    :type="type"
    :class="['base-button', `base-button--${variant}`]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
  // types
  interface Props {
    variant: 'primary' | 'secondary' | 'menu'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }

  // props
  withDefaults(defineProps<Props>(), {
    variant: 'primary',
    disabled: false,
    type: 'button',
  })

  defineOptions({
    inheritAttrs: false,
  })
</script>

<style scoped lang="scss">
  .base-button {
    @include flex-center;
    gap: 8px;
    color: $color-white;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    border: none;
    border-radius: 28px;
    background-color: transparent;
    padding: 15px 21px;
    cursor: pointer;
    transition:
      background-color $transition-300,
      color $transition-300,
      border-color $transition-300;

    &--primary {
      background-color: $color-cornflower-blue;
      border: 1px solid $color-cornflower-blue;

      &:hover,
      &:focus-visible {
        background-color: $color-white;
        color: $color-black;
        border: 1px solid $color-black;
        outline: none;
      }

      &:disabled {
        background-color: $color-east-bay;
        color: $color-white-50;
        border: 1px solid $color-east-bay;
        pointer-events: none;
      }
    }

    &--secondary {
      background-color: $color-montana;
      border: 1px solid $color-black-40;

      &:hover,
      &:focus-visible {
        background-color: $color-white;
        color: $color-black;
        border: 1px solid $color-black;
        outline: none;
      }

      &:disabled {
        background-color: $color-dim-gray;
        color: $color-white-50;
        border: 1px solid $color-black-40;
        pointer-events: none;
      }
    }

    &--menu {
      border-radius: unset;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
      padding: 8px 0px 7px;
      border-bottom: 1px solid transparent;

      @include vp-767 {
        padding: 0;
        border-bottom: unset;
      }

      &:hover,
      &:focus-visible {
        border-bottom: 1px solid $color-heliotrope;
        outline: none;

        @include vp-767 {
          border: unset;
        }
      }
    }
  }
</style>
