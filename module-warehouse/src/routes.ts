const APP_NAME = process.env.VUE_APP_NAME;

const App = () => import('./App.vue');
const Metadata = () => import('./views/metadata.vue');
const Datasource = () => import('./views/datasource.vue');

export default [{
  path: `${APP_NAME}`,
  name: APP_NAME,
  component: App,
  children: [{
    path: '',
    redirect: 'metadata'
  }, {
    path: 'metadata',
    name: `${APP_NAME}.metadata`,
    component: Metadata
  }, {
    path: 'datasource',
    name: `${APP_NAME}.datasource`,
    component: Datasource
  }]
}];
