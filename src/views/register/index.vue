<template>
  <div :class="styles.container">
    <div :class="styles.logo">
      <img alt="logo" src="/src/assets/images/logo.png" />
      <div :class="styles['logo-text']">PowerX Web</div>
    </div>
    <div :class="styles.content">
      <div :class="styles['content-inner']">
        <RegisterForm />
      </div>
      <div :class="styles.footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Footer from '@/components/footer/index.vue';
  import RegisterForm from './components/register-form.vue';
  import styles from './index.module.less';
</script>
