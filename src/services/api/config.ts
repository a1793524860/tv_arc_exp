import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { from, Observable } from 'rxjs';

import configureMockApi from './mock';

const USE_MOCK_API : boolean = true;
const MOCK_VERBOSE : boolean = false;

const instance = axios.create({
  baseURL: (
    !USE_MOCK_API &&
    (process.env.NODE_ENV === 'development')
  ) ? 'http://localhost:9000'
  : undefined,
  headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.response.use(
  (res : any) => {
    if (
      res &&
      res.data &&
      res.data.status !== undefined &&
      (res.data.status !== 'Y') &&
      (!res.data.jti)
    ) {
      const { config, data } : any = res;
      console.log('[API錯誤但是回200]', `[${config.method}]`, config.url, data);
      console.log('--');
      throw new Error(data.message);
    } else {
      return res;
    }
  },
  (err) => {
    console.log('--');
    console.log(err);
    console.log('[API錯誤] ', err);
    const { data } : any = (err || {}).response || {};
    if (data && (data.error === 'invalid_token')) {
      alert('登入逾時');
      window.location.href = '/insm';
    }
    throw new Error((data || {}).message || {});
  }
);

if (USE_MOCK_API && MOCK_VERBOSE) {

  instance.interceptors.request.use((config) => {
    const { url } = config;
    console.log('[AXOIS MOCK]', url, config);
    return config;
  }, async (err : any) => err);

}

if (USE_MOCK_API) {
  console.log('MOCK API is being used - IT SHOULD BE SWITCHED OFF IN PRODUCTION');
  const mock = new MockAdapter(instance, { delayResponse: 300 });
  configureMockApi(mock);
}

export const updateSessionHeaders = (session : string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${session}`;
}

export const promiseToObservable = <T>(func : Function) => (
  (...args : Array<T>) : Observable<any> => from(func(...args))
);

export default instance;