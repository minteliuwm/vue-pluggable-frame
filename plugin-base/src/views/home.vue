<template>
  <a-layout class="m-home">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" v-model="keys" :style="{ lineHeight: '64px' }" @click="onMenuClick">
        <a-menu-item key="module-job">任务</a-menu-item>
        <a-menu-item key="module-warehouse">数仓</a-menu-item>
        <!-- <a-menu-item key="module-resource">资源</a-menu-item> -->
      </a-menu>
    </a-layout-header>
    <a-layout-content>
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

const MODULE_KEYS = ['module-job', 'module-warehouse'];

@Component
export default class MHome extends Vue {
  private keys: string[] = [];

  @Watch('$route', { immediate: true, deep: true })
  private onUrlChange(val: any, oldVal: any) {
    val.path && MODULE_KEYS.forEach(module => {
      if (val.path.includes(`/${module}`)) {
        this.keys = [module];
      }
    });
  }

  private mounted() {}

  private onMenuClick({ key = '' } = {}) {
    key && this.$router.push({
      path: `/micro/${key}`
    }).catch(() => {});
  }
}
</script>

<style lang="scss" scoped>
.m-home {
  width: 100%;
  height: 100%;
  .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
}
</style>
