import apiRequest from '@/util/request';
import ApplicationConfig from '@/config';

export interface Tag {
  id: number;
  created_at: Date;
  name: string;
  type: string;
}


export function queryTagBooks({ page, pageSize, id }: { page?: number, pageSize?: number, id: number }) {
  return apiRequest(
    ApplicationConfig.api.TagBooksURL.replace(':id', String(id)),
    {
      params: {
        page,
        page_size: pageSize,
      },
    },
  );
}


export function queryTags({ ...query }) {
  return apiRequest.get(
    ApplicationConfig.api.tags,
    {
      params: query,
    },
  );
}
