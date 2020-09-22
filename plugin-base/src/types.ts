import { Store } from 'vuex';
import Router from 'vue-router';

export interface IGlobalPool {
  store: Store<any>;
  router: Router;
}
