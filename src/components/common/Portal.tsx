import { ReactNode, MouseEventHandler } from 'react'
import ReactDOM from 'react-dom'
import Dimmed from './Dimmed'

interface PortalProps {
  children?: ReactNode
  dimmed: MouseEventHandler
}

export default function Portal({ children, dimmed }: PortalProps) {
  return ReactDOM.createPortal(<Dimmed click={dimmed}>{children}</Dimmed>, document.getElementById('portal') as HTMLElement)
}
