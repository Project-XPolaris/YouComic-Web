export function getImageURL(path: string): string {
  return `${path}`;
}

export function getCoverThumbnailURL(path:string) : string {
  return `${path}`.replace("cover","cover_thumbnail")

}
