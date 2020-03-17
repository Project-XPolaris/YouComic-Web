import ApplicationConfig from '@/config';

export function getImageURL(path: string): string {
  return `${ApplicationConfig.apiURL}${path}`;
}

export function getCoverThumbnailURL(path:string) : string {
  return `${ApplicationConfig.apiURL}${path}`.replace("cover","cover_thumbnail")

}
