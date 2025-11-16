<template>
  <footer class="footer">
    <div class="container">
      <AppSocial class="footer__social" />
    </div>
  </footer>
</template>

<script setup lang="ts">
  // components
  import AppSocial from './AppSocial.vue'
</script>

<style lang="scss" scoped>
  .footer {
    padding: 40px 0;

    @include vp-767 {
      padding: 24px 0;
    }
  }
</style>
