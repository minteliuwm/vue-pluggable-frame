const APP_NAME = process.env.VUE_APP_NAME;

const App = () => import('./App.vue');
const File = () => import('./views/file.vue');
const Arctic = () => import('./views/arctic.vue');

export default [{
  path: `${APP_NAME}`,
  name: APP_NAME,
  component: App,
  children: [{
    path: '',
    redirect: 'file'
  }, {
    path: 'file',
    name: `${APP_NAME}.file`,
    component: File
  }, {
    path: 'arctic',
    name: `${APP_NAME}.arctic`,
    component: Arctic
  }]
}];
