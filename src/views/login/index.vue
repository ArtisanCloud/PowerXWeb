<template>
  <div :class="styles.container">
    <div :class="styles.logo">
      <img alt="logo" src="/src/assets/images/logo.png" />
      <div :class="styles['logo-text']">PowerX Web</div>
    </div>
    <!--    <LoginBanner />-->
    <div :class="styles.content">
      <div :class="styles.contentInner">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from './components/login-form.vue';
  import styles from './index.module.less';
</script>
