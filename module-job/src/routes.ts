const APP_NAME = process.env.VUE_APP_NAME;

const App = () => import('./App.vue');
const Sql = () => import('./views/sql.vue');
const Jar = () => import('./views/jar.vue');
const Notebook = () => import('./views/notebook.vue');

export default [{
  path: `${APP_NAME}`,
  name: APP_NAME,
  component: App,
  children: [{
    path: '',
    redirect: 'sql'
  }, {
    path: 'sql',
    name: `${APP_NAME}.sql`,
    component: Sql
  }, {
    path: 'jar',
    name: `${APP_NAME}.jar`,
    component: Jar
  }, {
    path: 'notebook',
    name: `${APP_NAME}.notebook`,
    component: Notebook
  }]
}];
