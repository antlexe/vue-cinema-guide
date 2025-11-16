<template>
  <div class="auth-mode">
    <h3 class="auth-mode__title visually-hidden">Вход</h3>

    <!-- форма входа -->
    <Form
      @submit="onSubmit"
      class="auth-form"
      :validation-schema="loginSchema"
      v-slot="{ errors }"
    >
      <div class="auth-form__wrapper">
        <!-- логин -->
        <div class="auth-form__field">
          <Field
            name="email"
            type="email"
            placeholder="Электронная почта"
            :class="[
              'auth-form__input',
              { 'auth-form__input--error': errors.email },
            ]"
          />
          <IconMail class="auth-form__icon" aria-hidden="true" />
          <ErrorMessage name="email" class="auth-form__error" />
        </div>

        <!-- пароль -->
        <div class="auth-form__field">
          <Field
            name="password"
            type="password"
            placeholder="Пароль"
            :class="[
              'auth-form__input',
              { 'auth-form__input--error': errors.password },
            ]"
          />
          <IconKey class="auth-form__icon" aria-hidden="true" />
          <ErrorMessage name="password" class="auth-form__error" />
        </div>
      </div>

      <!-- кнопка входа -->
      <BaseButton variant="primary" type="submit" class="auth-form__btn">
        Войти
      </BaseButton>
    </Form>

    <!-- кнопка перехода в окно регистрации -->
    <button
      type="button"
      @click="$emit('switch-to-register')"
      class="auth-mode__switch"
    >
      Регистрация
    </button>
  </div>
</template>

<script setup lang="ts">
  // components
  import BaseButton from '@/components/ui/BaseButton.vue'

  // icons
  import IconMail from '@/components/ui/icons/IconMail.vue'
  import IconKey from '@/components/ui/icons/IconKey.vue'

  // vee-validate
  import type { SubmissionHandler } from 'vee-validate'
  import { Form, Field, ErrorMessage } from 'vee-validate'

  // yup
  import { object, string } from 'yup'

  // types
  interface Emits {
    (e: 'switch-to-register'): void
    (e: 'submit', values: { email: string; password: string }): void
  }

  // emits
  const emit = defineEmits<Emits>()

  const loginSchema = object({
    email: string().email('Некорректный email').required('Обязательное поле'),
    password: string().required('Обязательное поле'),
  })

  const onSubmit: SubmissionHandler = (values) => {
    const { email, password } = values as { email: string; password: string }
    emit('submit', { email, password })
  }
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

    &__switch {
      background-color: transparent;
      border: none;
      padding: 0;
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
      color: $color-black;
      width: fit-content;
      align-self: center;
      cursor: pointer;
      transition:
        background-color $transition-300,
        color $transition-300;

      &:hover,
      &:focus-visible {
        color: $color-heliotrope;
        outline: none;
      }
    }
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 24px;

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    &__field {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    &__input {
      padding: 15px 16px 15px 52px;
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
      border-width: 1px;
      border: 1px solid;
      border-radius: 8px;
      transition: border-color $transition-300;
      width: 100%;
      background-color: $color-white;
      border-color: $color-black-40;

      &--error {
        border-color: $color-salmon;

        & + .auth-form__icon {
          color: $color-salmon;
        }
      }

      &:hover,
      &:focus-visible {
        border-color: $color-perana;
        outline: none;

        & + .auth-form__icon {
          color: $color-perana;
        }
      }
    }

    &__icon {
      position: absolute;
      top: 16px;
      left: 16px;
      color: $color-black-40;
      pointer-events: none;
      transition: color $transition-300;
    }

    &__error {
      color: $color-salmon;
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
    }
  }
</style>
