import {decode} from 'jwt-simple'

export function decodeJwtSign(sign: string) {
  return decode(sign, "", true, 'HS256')
}
