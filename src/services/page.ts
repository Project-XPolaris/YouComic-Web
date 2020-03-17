import apiRequest from '@/util/request';
import ApplicationConfig from '@/config';

export interface Page {
  id: number;
  created_at: Date;
  order: number;
  book_id: number;
  path: string;
}

export function queryPages({ book ,page,pageSize}:{book:string | number}) {
  return apiRequest(
    ApplicationConfig.api.PagesURL, {
      params: {
        book,
        page,
        page_size:pageSize
      },
    },
  );
}
