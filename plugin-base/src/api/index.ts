interface IApi {
  [propName: string]: Function;
}

const files = require.context('./', false, /\.ts$/);
let api: IApi = {};

files.keys().forEach(key => {
  const fileName = key.replace(/(\.\/|\.ts)/g, '');
  if (fileName !== 'index') {
    api = {
      ...api,
      ...files(key).default
    };
  }
});

export default api;
