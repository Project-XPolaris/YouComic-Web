import apiRequest from '@/util/request';
import ApplicationConfig from '@/config';

export interface UserAuth {
  id: number
  sign: number
}

export interface User {
  id: number
  nickname: string,
  avatar: string
}

export function getAuth({ username, password }: { username: string, password: string }) {
  return apiRequest.post(
    ApplicationConfig.api.auth, {
      data: { username, password },
    },
  );
}

export function getUser({ id }: { id: number }) {
  return apiRequest.get(
    ApplicationConfig.api.user.replace(':id', String(id)),
  );
}
