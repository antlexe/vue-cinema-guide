<template>
  <ul class="socials">
    <li class="socials__item">
      <a class="socials__link" href="#" aria-label="Ссылка на ВК">
        <IconLogoVk aria-hidden="true" />
      </a>
    </li>
    <li class="socials__item">
      <a class="socials__link" href="#" aria-label="Ссылка на YouTube">
        <IconLogoYoutube aria-hidden="true" />
      </a>
    </li>
    <li class="socials__item">
      <a class="socials__link" href="#" aria-label="Ссылка на Одноклассники">
        <IconLogoOk aria-hidden="true" />
      </a>
    </li>
    <li class="socials__item">
      <a class="socials__link" href="#" aria-label="Ссылка на Телеграм">
        <IconLogoTg aria-hidden="true" />
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
  // icons
  import IconLogoVk from '@/components/ui/icons/logo/IconLogoVk.vue'
  import IconLogoOk from '@/components/ui/icons/logo/IconLogoOk.vue'
  import IconLogoYoutube from '@/components/ui/icons/logo/IconLogoYoutube.vue'
  import IconLogoTg from '@/components/ui/icons/logo/IconLogoTg.vue'
</script>

<style lang="scss" scoped>
  .socials {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
    list-style: none;
    margin: 0;
    padding: 2px 0;

    @include vp-767 {
      padding: 0 0 12px 0;
      justify-content: flex-start;
    }

    &__link {
      @include flex-center;
      border: 1px solid $color-white-80;
      border-radius: 8px;
      width: 36px;
      height: 36px;
      color: $color-white-80;

      @include vp-767 {
        width: 24px;
        height: 24px;
      }

      &:hover,
      &:focus-visible {
        outline: none;
        color: white;
        border-color: white;
      }
    }
  }
</style>
