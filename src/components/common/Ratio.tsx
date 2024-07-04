import Image from 'next/image'

import styled from 'styled-components'

interface RatioProps {
  ratio: string
  src: string
}

export default function Ratio({ ratio, src }: RatioProps) {
  return (
    <RatioWrapper $ratio={ratio}>
      <Image
        src={src}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        fill
        sizes="100%"
        quality={100}
        alt="이미지"
      />
    </RatioWrapper>
  )
}

const RatioWrapper = styled.div<{ $ratio: string }>`
  display: block;
  position: relative;
  width: 100%;
  overflow: hidden;
  &:before {
    content: '';
    display: block;
    ${({ $ratio }) =>
      $ratio === '3_1' &&
      `
      padding-top: 33.33%;
    `}
    ${({ $ratio }) =>
      $ratio === '2_1' &&
      `
      padding-top: 50%;
    `}
    ${({ $ratio }) =>
      $ratio === '3_2' &&
      `
      padding-top: 66.66%;
    `}
    ${({ $ratio }) =>
      $ratio === '1_1' &&
      `
      padding-top: 100%;
    `}
  }
`
