import { createMedia } from "@artsy/fresnel"

export const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
})