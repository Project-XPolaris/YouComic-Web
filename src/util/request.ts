import request, { Context, extend, ResponseError } from 'umi-request';
import { pickBy } from 'lodash';
import URI from 'urijs';
import { ListQueryContainer } from '@/services/base';
import { Book } from '@/services/book';
import { Page } from '@/services/page';

const pathToRegexp = require('path-to-regexp');

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
  errorHandler,
});


interface PathNamePostProcess<T> {
  regex: string
  onProcess: (context: Context, response: T) => void
}

const bookListPostProcess: PathNamePostProcess<ListQueryContainer<Book>> = {
  regex: '/books',
  onProcess: ((context, response) => {
    const host = 'http://' + URI(context.req.url).host();
    response.result.forEach(book => {
      book.cover = host + book.cover;
    });
  }),
};
const tagBooksPostProcess: PathNamePostProcess<ListQueryContainer<Book>> = {
  regex: '/tag/:tagId(\\d+)/books',
  onProcess: ((context, response) => {
    const host = 'http://' + URI(context.req.url).host();
    response.result.forEach(book => {
      book.cover = host + book.cover;
    });
  }),
};
//
const pageListPostProcess: PathNamePostProcess<ListQueryContainer<Page>> = {
  regex: '/pages',
  onProcess: ((context, response) => {
    const host = 'http://' + URI(context.req.url).host();
    response.result.forEach(page => {
      page.path = host + page.path;
    });
  }),
};
apiRequest.use(async (ctx, next) => {
  if (window.apiurl === undefined) {
    const json = await request.get('/config.json');
    window.apiurl = json.apiurl;
  }
  ctx.req.url = window.apiurl + ctx.req.url;
  await next();
  // for (let process of [
  //   bookListPostProcess,
  //   pageListPostProcess,
  //   tagBooksPostProcess,
  // ]) {
  //   const pathname = URI(ctx.req.url).pathname();
  //   const regexp = pathToRegexp(process.regex);
  //   const match = regexp.exec(pathname);
  //   if (match) {
  //     process.onProcess(ctx, ctx.res);
  //   }
  // }
  const pathname = URI(ctx.req.url).pathname();
  if (pathname === '/books') {
    const host = 'http://' + URI(ctx.req.url).host();
    ctx.res.result.forEach((book: any) => {
      book.cover = host + book.cover;
    });
  }

  if (pathname === '/pages') {
    const host = 'http://' + URI(ctx.req.url).host();
    ctx.res.result.forEach(page => {
      page.path = host + page.path;
    });
  }
  console.log(ctx);
});
apiRequest.interceptors.request.use((url, options) => {
  options.params = pickBy(options.params, (value) => typeof value !== 'undefined');
  return (
    {
      url,
      options: { ...options, mode: 'cors' },
    }
  );
}, { global: true });
apiRequest.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('youcomic_token');
  let headers = options.headers;
  if (token != null) {
    headers = {
      ...options.headers,
      'Authorization': token,
      'Access-Control-Allow-Origin': '*',
    };
  }
  return {
    url,
    options: {
      ...options,
      headers,
    },
  };
}, { global: true });
apiRequest.interceptors.request.use((url, options) => {
  const opt = options;
  if (options.params !== undefined && 'pageSize' in options.params) {

    opt.params = {
      ...opt.params,
      // @ts-ignore
      page_size: opt.params['pageSize'],
    };
  }
  return {
    url,
    options: {
      ...opt,
    },
  };
}, { global: true });
export default apiRequest;

export const imageRequest = extend({});

imageRequest.use(async (ctx, next) => {
  let token = '';
  token = localStorage.getItem('youcomic_token');
  ctx.req.options.headers = {
    ...ctx.req.options.headers,
    'Authorization': token,
  };
  ctx.req.options.responseType = 'blob';
  await next();
});


