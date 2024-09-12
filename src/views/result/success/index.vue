<template>
  <div :class="styles.container">
    <Breadcrumb :items="['menu.result', 'menu.result.success']" />
    <div :class="styles.wrapper">
      <a-result
        :class="styles.result"
        status="success"
        :title="$t('success.result.title')"
        :subtitle="$t('success.result.subTitle')"
      >
        <template #extra>
          <a-space :class="styles['operation-wrap']" :size="16">
            <a-button key="again" type="secondary">
              {{ $t('success.result.printResult') }}
            </a-button>
            <a-button key="back" type="primary">
              {{ $t('success.result.projectList') }}
            </a-button>
          </a-space>
        </template>
      </a-result>

      <div :class="styles['steps-wrapper']">
        <a-typography-paragraph bold>{{
          $t('success.result.progress')
        }}</a-typography-paragraph>
        <a-steps type="dot" :current="2">
          <a-step
            :title="$t('success.submitApplication')"
            description="2020/10/10 14:00:39"
          />
          <a-step
            :title="$t('success.leaderReview')"
            :description="$t('success.processing')"
          />
          <a-step
            :title="$t('success.purchaseCertificate')"
            :description="$t('success.waiting')"
          />
          <a-step
            :title="$t('success.safetyTest')"
            :description="$t('success.waiting')"
          />
          <a-step
            :title="$t('success.launched')"
            :description="$t('success.waiting')"
          />
        </a-steps>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import styles from './index.module.less';
</script>

<script lang="ts">
  export default {
    name: 'Success',
  };
</script>
