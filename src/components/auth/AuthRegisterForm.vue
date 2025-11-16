<template>
  <div class="auth-mode">
    <h2 class="auth-mode__title">Регистрация</h2>

    <!-- форма регистрации -->
    <Form
      @submit="onSubmit"
      class="auth-form"
      :validation-schema="registerSchema"
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

        <!-- имя -->
        <div class="auth-form__field">
          <Field
            name="name"
            type="text"
            placeholder="Имя"
            :class="[
              'auth-form__input',
              { 'auth-form__input--error': errors.name },
            ]"
          />
          <IconUser class="auth-form__icon" aria-hidden="true" />
          <ErrorMessage name="name" class="auth-form__error" />
        </div>

        <!-- фамилия -->
        <div class="auth-form__field">
          <Field
            name="surname"
            type="text"
            placeholder="Фамилия"
            :class="[
              'auth-form__input',
              { 'auth-form__input--error': errors.surname },
            ]"
          />
          <IconUser class="auth-form__icon" aria-hidden="true" />
          <ErrorMessage name="surname" class="auth-form__error" />
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

        <!-- повтор пароля -->
        <div class="auth-form__field">
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Подтвердите пароль"
            :class="[
              'auth-form__input',
              { 'auth-form__input--error': errors.confirmPassword },
            ]"
          />
          <IconKey class="auth-form__icon" aria-hidden="true" />
          <ErrorMessage name="confirmPassword" class="auth-form__error" />
        </div>
      </div>

      <!-- кнопка создания аккаунта -->
      <BaseButton variant="primary" type="submit" class="auth-form__btn">
        Создать аккаунт
      </BaseButton>
    </Form>

    <!-- кнопка перехода в окно входа -->
    <button
      type="button"
      @click="$emit('switch-to-login')"
      class="auth-mode__switch"
    >
      У меня есть пароль
    </button>
  </div>
</template>

<script setup lang="ts">
  // components
  import BaseButton from '@/components/ui/BaseButton.vue'

  // icons
  import IconMail from '@/components/ui/icons/IconMail.vue'
  import IconKey from '@/components/ui/icons/IconKey.vue'
  import IconUser from '@/components/ui/icons/IconUser.vue'

  // vee-validate
  import type { SubmissionHandler } from 'vee-validate'
  import { Form, Field, ErrorMessage } from 'vee-validate'

  // yup
  import { object, string, ref as yupRef } from 'yup'

  // types
  interface Emits {
    (e: 'switch-to-login'): void
    (
      e: 'submit',
      values: {
        email: string
        name: string
        surname: string
        password: string
        confirmPassword: string
      },
    ): void
  }

  // emits
  const emit = defineEmits<Emits>()

  const registerSchema = object({
    email: string().email('Некорректный email').required('Обязательное поле'),
    name: string().required('Обязательное поле'),
    surname: string().required('Обязательное поле'),
    password: string()
      .min(6, 'Минимум 6 символов')
      .required('Обязательное поле'),
    confirmPassword: string()
      .oneOf([yupRef('password')], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  })

  const onSubmit: SubmissionHandler = (values) => {
    const { email, name, surname, password, confirmPassword } = values as {
      email: string
      name: string
      surname: string
      password: string
      confirmPassword: string
    }
    emit('submit', { email, name, surname, password, confirmPassword })
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
