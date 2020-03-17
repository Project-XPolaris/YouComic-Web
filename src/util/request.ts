import request from 'umi-request';
import { extend, ResponseError } from 'umi-request';
import ApplicationConfig from '@/config';
import { pickBy } from 'lodash';

const errorHandler = function(error: ResponseError) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.data);
    console.log(error.request);
  }
};

const apiRequest = extend({
  prefix: ApplicationConfig.apiURL,
  errorHandler,
});

apiRequest.interceptors.request.use((url, options) => {
  options.params = pickBy(options.params, (value) => typeof value !== 'undefined');
  return (
    {
      url,
      options: { ...options, credentials: 'same-origin' },
    }
  );
},{ global: true });
apiRequest.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('youcomic_token');
  let headers = options.headers;
  if (token != null) {
    headers = {
      ...options.headers,
      'Authorization': token,
    };
  }
  return {
    url,
    options: {
      ...options,
      headers,
    },
  };
},{ global: true });
apiRequest.interceptors.request.use((url, options) => {
  const opt = options;
  if (options.params !== undefined && "pageSize" in options.params){

    opt.params = {
      ...opt.params,
      // @ts-ignore
      page_size:opt.params['pageSize']
    }
  }
  return {
    url,
    options: {
      ...opt,
    },
  };
},{ global: true });
export default apiRequest;
