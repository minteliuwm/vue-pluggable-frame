import Vue from 'vue';

const files = require.context('./', false, /\.ts$/);
let funcs: any = {};

files.keys().forEach(key => {
  const fileName = key.replace(/(\.\/|\.ts)/g, '');
  if (fileName !== 'index') {
    funcs = {
      ...funcs,
      ...files(key).default
    };
  }
});

export default funcs;
