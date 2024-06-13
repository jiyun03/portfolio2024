import { useTheme } from '@/context/themeProvider'

import styled, { css } from 'styled-components'
import { animated, useTransition } from 'react-spring'
import IC_IconThemeDark from '/public/assets/icons/theme_dark.svg'
import IC_IconThemeLight from '/public/assets/icons/theme_light.svg'

export default function ThemeToggle() {
  const [themeMode, toggleTheme] = useTheme()
  const isDark: boolean = themeMode === 'dark'

  const transitions = useTransition(isDark, {
    initial: {
      transform: 'scale(1) rotate(0deg)',
      opacity: 1,
    },
    from: {
      transform: 'scale(0) rotate(-180deg)',
      opacity: 0,
    },
    enter: {
      transform: 'scale(1) rotate(0deg)',
      opacity: 1,
    },
    leave: {
      transform: 'scale(0) rotate(180deg)',
      opacity: 0,
    },
    reverse: true,
  })

  return (
    <ToggleButton $mode={themeMode} onClick={toggleTheme}>
      {transitions((style: any, item: boolean) =>
        item ? (
          <Positioner>
            <AnimatedWrapper style={style}>
              <IC_IconThemeDark />
            </AnimatedWrapper>
          </Positioner>
        ) : (
          <Positioner>
            <AnimatedWrapper style={style}>
              <IC_IconThemeLight />
            </AnimatedWrapper>
          </Positioner>
        )
      )}
    </ToggleButton>
  )
}

const ToggleButton = styled.div<{ $mode: string }>`
  position: relative;
  padding: 12.8rem;
  width: 23rem;
  height: 23rem;
  border-radius: 50%;
  box-sizing: content-box;
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.headerHover};
  }
  svg {
    width: 23rem;
    height: 23rem;
  }
  ${({ $mode }) =>
    $mode === 'dark' &&
    css`
      svg {
        width: 18rem;
        height: 18rem;
      }
    `}
`

const Positioner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const AnimatedWrapper = styled(animated.div)`
  color: ${({ theme }) => theme.textColor};
  svg {
    display: block;
  }
`
