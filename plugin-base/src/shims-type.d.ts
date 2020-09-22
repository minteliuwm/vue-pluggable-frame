import { Store } from 'vuex';
import Router from 'vue-router';

interface IGlobalPool {
  store: Store<any>;
  router: Router;
  utils: any;
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    __GLOBAL_POOL__: IGlobalPool;
  }
}
