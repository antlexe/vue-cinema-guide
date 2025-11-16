<template>
  <div class="auth-mode">
    <h3 class="auth-mode__title">Регистрация завершена</h3>
    <p class="auth-mode__text">Используйте вашу электронную почту для входа</p>
    <BaseButton
      variant="primary"
      @click="$emit('login')"
      class="auth-mode__switch-primary"
    >
      Войти
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  // components
  import BaseButton from '@/components/ui/BaseButton.vue'

  // emits
  defineEmits<{
    login: []
  }>()
</script>

<style scoped lang="scss">
  .auth-mode {
    display: flex;
    flex-direction: column;
    gap: 24px;

    &__title {
      margin: 0;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      color: $color-black;
      text-align: center;
    }

    &__text {
      margin: 0;
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
      text-align: center;
      color: $color-black;
    }
  }
</style>
