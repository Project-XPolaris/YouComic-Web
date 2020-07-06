import { imageRequest } from '@/util/request';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@material-ui/lab';


interface ImageLoaderPropsType {
  url?: string
  className: any
  alt?: string
  loadingWidth?:number
  loadingHeight?:number
}


export default function ImageLoader({ url, className, alt,loadingHeight = 0,loadingWidth = 0, ...props }: ImageLoaderPropsType) {
  const [image, setImage] = useState<Blob>();
  const [loading,setLoading] = useState<boolean>(true)
  useEffect(() => {
    if (url) {
      imageRequest.get(url).then((image: Blob) => {
        setImage(image);
        setLoading(false)
      });
    }
  }, []);
  return (
    <>
      {
        loading? <Skeleton variant="rect" width={loadingWidth} height={loadingHeight} animation="wave" />
        :<img src={image !== undefined ? URL.createObjectURL(image) : ''} className={className} alt={alt} {...props}/>}
    </>
  );
}
