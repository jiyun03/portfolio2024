import styled from 'styled-components'

interface ContainerProps {
  type: string
  children: React.ReactNode
}

export default function Container({ type, children }: ContainerProps) {
  return <ContainerWrapper type={type}>{children}</ContainerWrapper>
}

const ContainerWrapper = styled.div<{ type: string }>`
  width: 100%;
  padding: 0 24rem;
  margin-top: 64rem;
  margin-left: auto;
  margin-right: auto;
  ${(props) =>
    props.type === 'view' &&
    `
    max-width: 1000px;
  `}
  ${({ theme }) => theme.sm`
    padding: 0 15px;
  `}
`
