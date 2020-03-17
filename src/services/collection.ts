import apiRequest from '@/util/request';
import ApplicationConfig from '@/config';

export interface Collection {
  id: number
  name: string
  owner: number
}

export function queryCollections({ ...query }) {
  return apiRequest(
    ApplicationConfig.api.collections,
    {
      params: query,
    },
  );
}

export function addBookToCollection({ collectionId, bookIds }: { collectionId: number, bookIds: number[] }) {
  return apiRequest.put(
    ApplicationConfig.api.collectionBooks.replace(':id', String(collectionId)),
    {
      data: {
        books: bookIds,
      },
    },
  );
}

export function createCollection({ name }: { name: string }) {
  return apiRequest.post(
    ApplicationConfig.api.collections,
    {
      data: {
        name,
      },
    },
  );
}

export function removeUserFromCollection({ id, userId }: { id: number, userId: number }) {
  return apiRequest.delete(
    ApplicationConfig.api.collectionUsers.replace(':id', String(id)),
    {
      data: {
        users: [userId],
      },
    },
  );

}

export function deleteCollection({ id }: { id: number }) {
  return apiRequest.delete(
    ApplicationConfig.api.collection.replace(':id', String(id)),
    {},
  );

}

export function deleteBookFromCollection({ collectionId, bookId }: { collectionId: number, bookId: number }) {
  return apiRequest.delete(
    ApplicationConfig.api.collectionBooks.replace(':id', String(collectionId)),
    {
      data: {
        books: [bookId],
      },
    },
  );

}
