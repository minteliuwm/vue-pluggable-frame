import Vue from 'vue';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import API from '../api';
import { cloneDeep } from 'lodash';

interface IHttpResponse {
  code: number;
  msg: string;
  result?: any;
  data?: any;
}

const { protocol, hostname, port } = window.location;
const ORIGIN = port ? `${protocol}//${hostname}:${port}/` : `${protocol}//${hostname}/`;

// url前缀
const PRE_URL = `${process.env.VUE_APP_PREFIX}/api/v1/`;

const DEFAULT_CONFIG = {
  baseURL: '',
  timeout: 10 * 60 * 1000,
  headers: {
    'Cache-Control': 'no-cache'
  }
};

const DEFAULT_OPTIONS: AxiosRequestConfig = {
  method: 'get',
  url: ''
};

const handleUrlSpecialCharacters = (url: string) => {
  return url.replace(/#/g, '%23'); // 暂时先处理 # 的情况，后续有出现其他特殊字符再说。
};

const ajax = (args: any = {}) => {
  const options: AxiosRequestConfig = Object.assign({}, DEFAULT_OPTIONS, args);

  if ((!options.method || options.method.toLowerCase() === 'get' || options.method.toLowerCase() === 'delete') && options.data) {
    options.url = decodeURIComponent(handleUrlSpecialCharacters(options.url + '?' + qs.stringify(options.data)));
    delete options.data;
  }

  const axiosConfig = cloneDeep(DEFAULT_CONFIG);
  axiosConfig.baseURL = ORIGIN + PRE_URL;
  if (options.headers) {
    axiosConfig.headers = options.headers;
  }

  return new Promise((resolve, reject) => {
    const instance = axios.create(axiosConfig);

    // request 拦截器
    instance.interceptors.request.use(config => {
      return config;
    }, e => {
      return Promise.reject(e);
    });

    // response 拦截器
    instance.interceptors.response.use(response => {
      // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
      const data = response.data === undefined ? response.request.responseText : response.data;
      const code = data.code;
      if (!code || (code && !code.toString().startsWith('2'))) {
        if (code && code.toString() === '401') {
          throw new Error('Token Failed');
        } else {
          throw new Error(data.msg || data.message);
        }
      }
      return data;
    }, e => {
      return Promise.reject(e);
    });

    // 请求处理
    instance(options).then(res => resolve(res)).catch(e => {
      const msg = e.message;
      if (msg === 'Token Failed') {
        window.location.href = `${ORIGIN}/${process.env.VUE_APP_PREFIX}/api/login`;
        return;
      }
      if (msg === 'Network Error') {
        return Vue.prototype.$message.warning('请求超时，请稍后再试');
      }
      reject(e);
    });
  });
};

// 处理返回结果
const handleResponse = (res: IHttpResponse): any => {
  return res.result || res.data;
};

// 处理异常情况
export const handleException = (e: Error, content?: string): void => {
  const msg = e && e.message;
  Vue.prototype.$message.error(content || msg || '请求错误');
};

export const request = async (key: string, data?: any): Promise<any> => {
  const res = await ajax(API[key](data)) as IHttpResponse;
  return handleResponse(res);
};
