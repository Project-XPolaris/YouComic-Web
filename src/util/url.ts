import router from 'umi/router';

export function redirectByURL(toURL: string, current: string) {
  if (current !== toURL) {
    router.push(toURL);
  }
}
