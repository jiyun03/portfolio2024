import styled from 'styled-components'

interface RatioProps {
  ratio: string
  src: string
}

export default function Ratio({ ratio, src }: RatioProps) {
  return (
    <RatioWrapper ratio={ratio}>
      <div
        className="ratio__content"
        style={{
          background: `url('${src}') no-repeat center`,
          backgroundSize: 'cover',
        }}
      />
    </RatioWrapper>
  )
}

const RatioWrapper = styled.div<{ ratio: string }>`
  display: block;
  position: relative;
  width: 100%;
  overflow: hidden;
  &:before {
    content: '';
    display: block;
    ${(props) =>
      props.ratio === '3_2' &&
      `
      padding-top: 66.66%
    `}
    ${(props) =>
      props.ratio === '1_1' &&
      `
      padding-top: 100%
    `}
  }
  .ratio {
    &__content {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
`
