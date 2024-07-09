import { ReactNode, MouseEventHandler } from 'react'
import styled from 'styled-components'

interface DimmedProps {
  click: MouseEventHandler
  children: ReactNode
}

export default function Dimmed({ click, children }: DimmedProps) {
  return (
    <DimmedWrapper>
      <div className="dimmed__back" onClick={click} />
      {children && <div className="dimmed__child">{children}</div>}
    </DimmedWrapper>
  )
}

const DimmedWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1100;
  .dimmed {
    &__back {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
  }
`
