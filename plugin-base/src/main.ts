import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import utils from './utils';
import './components/index';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.__GLOBAL_POOL__ = {
  store,
  router,
  utils
};

Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
