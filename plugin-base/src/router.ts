import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from './views/home.vue';
import { modules } from './modules';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [{
  path: '/',
  redirect: '/micro'
}, {
  path: '/micro',
  name: 'Home',
  component: Home
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const cachedModules: Set<any> = new Set();

router.beforeEach(async (to, from, next) => {
  const [, , module] = to.path.split('/');

  if (!modules[module]) {
    return next();
  }

  if (cachedModules.has(module)) {
    return next();
  }

  const { default: application } = await window.System.import(modules[module]);

  if (application && application.routes && application.routes.length) {
    const routes = router.options.routes || [];
    const homeRoutes = routes.find(r => r.name === 'Home');
    if (homeRoutes) {
      !homeRoutes.children && (homeRoutes.children = []);
      if (!homeRoutes.children.length) {
        const route = application.routes[0];
        homeRoutes.children.push({
          path: '',
          redirect: route.name
        });
      }
      application.routes.forEach((route: RouteConfig) => homeRoutes.children?.push(route));
      router.addRoutes([homeRoutes]); // 动态添加子项目的 routes
    }
  }

  application && application.beforeEach && router.beforeEach((to, from, next) => {
    if (module === to.path.split('/')[1]) {
      application.beforeEach(to, from, next);
    } else {
      next();
    }
  });

  application && application.init && await application.init({}); // 子项目初始化

  cachedModules.add(module);

  next(to.path);
});

export default router;
