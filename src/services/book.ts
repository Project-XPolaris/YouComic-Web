import apiRequest from '@/util/request';
import ApplicationConfig from '@/config';
import { Tag } from '@/services/tag';

export interface Book {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  cover: string;
  tags: Tag[]
}

interface GetBookQuery {
  name?: string[] | string,
  id?: number | number[] | string | string[]
}

export function queryBooks(query: GetBookQuery) {
  return apiRequest.get(ApplicationConfig.api.BooksURL, {
    params: query,
  });

}

export function queryBookTags({ id }: { id: number }) {
  return apiRequest.get(
    ApplicationConfig.api.BookTagsURL.replace(':id', String(id)),
  );
}
