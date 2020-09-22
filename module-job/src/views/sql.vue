<template>
  <div class="m-sql">
    <div>这是 sql 任务页面</div>
    <div>全局用户名: {{userName}}</div>
    <div>模块sql: {{sql}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class MSql extends Vue {
  @State('userName', { namespace: 'global' })
  private userName!: string;

  @State('sql', { namespace: 'module-job/sql' })
  private sql!: string;
}
</script>

<style lang="scss">
.m-sql {
  padding: 16px;
  line-height: 32px;
}
</style>
