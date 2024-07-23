import styled from 'styled-components'
import IC_ZoomIn from '/public/assets/icons/zoom_in.svg'
import IC_ZoomOut from '/public/assets/icons/zoom_out.svg'
import IC_Reset from '/public/assets/icons/button_back.svg'

interface ZoomControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}

export default function ZoomControls({ onZoomIn, onZoomOut, onReset }: ZoomControlsProps) {
  return (
    <ZoomControlsWrapper>
      <button onClick={onZoomIn}>
        <IC_ZoomIn />
      </button>
      <button onClick={onZoomOut}>
        <IC_ZoomOut />
      </button>
      <button onClick={onReset}>
        <IC_Reset />
      </button>
    </ZoomControlsWrapper>
  )
}

const ZoomControlsWrapper = styled.div`
  position: absolute;
  top: 10rem;
  right: 10rem;
  button {
    padding: 10rem;
    &:last-child {
      svg {
        width: 25rem;
      }
    }
  }
  svg {
    width: 30rem;
    height: 30rem;
  }
`
