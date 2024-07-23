import { useState } from 'react'
import styled, { css } from 'styled-components'
import IC_Arrow_Right from '/public/assets/icons/arrow_right.svg'

export default function ColorPalette({ onColorChange }: { onColorChange: (color: string) => void }) {
  const colors = ['#00355c', '#2270c5', '#ff5733', '#128d27', '#6519c3']
  const [show, setShow] = useState(false)

  return (
    <ColorPaletteWrapper $show={show}>
      <div className="palette__color-wrap">
        {colors.map((color) => (
          <ColorPaletteButton key={color} onClick={() => onColorChange(color)} $color={color} />
        ))}
      </div>
      <button className="palette__btn" onClick={() => setShow(!show)}>
        <IC_Arrow_Right />
      </button>
    </ColorPaletteWrapper>
  )
}

const ColorPaletteWrapper = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 50%;
  left: ${({ $show }) => ($show ? '0' : '-80rem')};
  padding: 20rem 15rem;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0 20rem 20rem 0;
  transition: left 0.3s;
  ${({ theme, $show }) => css`
    ${theme.sm`
      top: initial;
      left: 50%;
      ${$show ? 'bottom: 0;' : 'bottom: -70rem;'}
      padding: 10rem 15rem;
      transform: translateX(-50%);
      border-radius: 20rem 20rem 0 0;
      transition: bottom 0.3s;
    `}
  `}
  .palette {
    &__btn {
      position: absolute;
      top: 50%;
      right: -40rem;
      padding: 15rem 5rem;
      border-radius: 0 20rem 20rem 0;
      transform: translateY(-50%);
      background-color: rgba(255, 255, 255, 0.5);
      ${({ theme }) => theme.sm`
        top: initial;
        right: initial;
        left: 50%;
        bottom: 58rem;
        border-radius: 20rem 0 0 20rem;
        transform: translateX(-50%) rotate(90deg);
      `}
      svg {
        width: 30rem;
        height: 30rem;
        transition: transform 0.3s;
        ${({ $show }) =>
          $show &&
          `
            transform: rotate(180deg);
          `}
        ${({ theme, $show }) => css`
          ${theme.sm`
            ${$show ? 'transform: rotate(0);' : 'transform: rotate(180deg);'}
          `}
        `}
      }
    }
    &__color {
      &-wrap {
        display: flex;
        flex-direction: column;
        ${({ theme }) => theme.sm`
          flex-direction: row;
        `}
    }
  }
`

const ColorPaletteButton = styled.button<{ $color: string }>`
  background-color: ${({ $color }) => $color};
  width: 40rem;
  height: 40rem;
  margin: 5rem;
`
