<template>
  <div id="module-job">
    <a-layout :style="{ height: '100%' }">
      <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="inline" v-model="keys" :style="{ height: '100%' }" @click="onMenuClick">
          <a-menu-item key="sql">
            sql 任务
          </a-menu-item>
          <a-menu-item key="notebook">
            notebook 任务
          </a-menu-item>
          <a-menu-item key="jar">
            jar 任务
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <router-view />
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import './base';

const APP_NAME = process.env.VUE_APP_NAME;
const MENU_KEYS = ['sql', 'jar', 'notebook'];

@Component
export default class App extends Vue {
  private keys: string[] = [];

  @Watch('$route', { immediate: true, deep: true })
  private onUrlChange(val: any, oldVal: any) {
    val.path && MENU_KEYS.forEach(menu => {
      if (val.path.includes(`/${menu}`)) {
        this.keys = [menu];
      }
    });
  }

  private onMenuClick({ key = '' } = {}) {
    key && this.$router.push({
      name: `${APP_NAME}.${key}`
    }).catch(() => {});
  }
}
</script>

<style lang="scss" scoped>
#module-job {
  width: 100%;
  height: 100%;
}
</style>
