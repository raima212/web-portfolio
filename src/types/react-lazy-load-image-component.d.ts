declare module 'react-lazy-load-image-component' {
  import { ComponentType, ImgHTMLAttributes } from 'react'

  interface LazyLoadImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string
    alt: string
    effect?: string
    placeholderSrc?: string
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void
  }

  export const LazyLoadImage: ComponentType<LazyLoadImageProps>
}

