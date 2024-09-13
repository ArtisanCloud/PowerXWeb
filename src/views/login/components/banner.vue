<template>
  <div :class="styles.banner">
    <div :class="styles['banner-inner']">
      <a-carousel :class="styles.carousel" animation-name="fade">
        <a-carousel-item v-for="item in carouselItem" :key="item.slogan">
          <div :key="item.slogan" :class="styles['carousel-item']">
            <div :class="styles['carousel-title']">{{ item.slogan }}</div>
            <div :class="styles['carousel-sub-title']">{{
              item.subSlogan
            }}</div>
            <img :class="styles['carousel-image']" :src="item.image" />
          </div>
        </a-carousel-item>
      </a-carousel>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  // import bannerImage from '@/assets/images/login-banner.png';
  import styles from './banner.module.less';

  const { t } = useI18n();
  const carouselItem = computed(() => [
    {
      slogan: t('login.banner.slogan1'),
      subSlogan: t('login.banner.subSlogan1'),
      // image: bannerImage,
    },
    {
      slogan: t('login.banner.slogan2'),
      subSlogan: t('login.banner.subSlogan2'),
      // image: bannerImage,
    },
    {
      slogan: t('login.banner.slogan3'),
      subSlogan: t('login.banner.subSlogan3'),
      // image: bannerImage,
    },
  ]);
</script>
