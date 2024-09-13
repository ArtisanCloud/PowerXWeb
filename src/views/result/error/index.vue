<template>
  <div :class="styles.container">
    <Breadcrumb :items="['menu.result', 'menu.result.error']" />
    <div :class="styles.wrapper">
      <a-result
        :class="styles.result"
        status="error"
        :title="$t('error.result.title')"
        :subtitle="$t('error.result.subTitle')"
      >
        <template #extra>
          <a-space :class="styles['operation-wrap']" :size="16">
            <a-button key="again" type="secondary">
              {{ $t('error.result.goBack') }}
            </a-button>
            <a-button key="back" type="primary">
              {{ $t('error.result.retry') }}
            </a-button>
          </a-space>
        </template>
      </a-result>

      <div :class="styles['details-wrapper']">
        <a-typography-title :heading="6" style="margin-top: 0">
          {{ $t('error.detailTitle') }}
        </a-typography-title>
        <a-typography-paragraph style="margin-bottom: 0">
          <ol>
            <li>
              {{ $t('error.detailLine.record') }}
              <a-link>
                <IconLink />
                {{ $t('error.detailLine.record.link') }}
              </a-link>
            </li>
            <li>{{ $t('error.detailLine.auth') }}</li>
          </ol>
        </a-typography-paragraph>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import styles from './index.module.less';
</script>

<script lang="ts">
  export default {
    name: 'Error',
  };
</script>
