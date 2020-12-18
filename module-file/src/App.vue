<template>
  <div id="module-file">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import './base';

@Component
export default class App extends Vue {
}
</script>

<style lang="scss" scoped>
#module-file {
  width: 100%;
  height: 100%;
}
</style>
