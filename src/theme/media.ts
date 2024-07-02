import { css } from 'styled-components'

interface Sizes {
  [key: string]: number
}

interface MediaFunction {
  [key: string]: (...args: Parameters<typeof css>[]) => ReturnType<typeof css>
}

const sizes: Sizes = {
  sm: 600,
  md: 768,
  lg: 1024,
  xl: 1400,
}

const media: MediaFunction = Object.keys(sizes).reduce((acc: MediaFunction, label: string) => {
  acc[label] = (...args: Parameters<typeof css>[]) => css`
    @media screen and (max-width: ${sizes[label]}px) {
      ${args as any};
    }
  `
  return acc
}, {})

export default media
