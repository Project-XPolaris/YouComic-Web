import URI from 'urijs'
export function getImageURL(path: string): string {
  return `${path}`;
}

export function getCoverThumbnailURL(path:string) : string {
  const uri = new URI(path)
  const fileName : string | undefined = uri.segment().pop()
  if (fileName === undefined){
    return path
  }
  const ext = fileName.split(".").pop()
  if (ext === undefined){
    return path
  }
  return `${path}`.replace(fileName,`cover_thumbnail.${ext}`)
}
