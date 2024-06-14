import { animated, useTransition } from 'react-spring'

import styled from 'styled-components'

interface FloatButtonProps {
  action: {
    action: boolean
    click: () => void
  }
  icon: JSX.Element
}

export default function FloatButton({ action, icon }: FloatButtonProps) {
  const transitions = useTransition(action.action, {
    initial: {
      transform: 'scale(0)',
      opacity: 0,
    },
    from: {
      transform: 'scale(1)',
      opacity: 1,
    },
    enter: {
      transform: 'scale(1)',
      opacity: 1,
    },
    leave: {
      transform: 'scale(0)',
      opacity: 0,
    },
    reverse: true,
  })

  return (
    <FloatButtonWrapper>
      {transitions(
        (style, item) =>
          item && (
            <AnimatedWrapper style={style}>
              <div className="float__icon" onClick={action.click}>
                {icon}
              </div>
            </AnimatedWrapper>
          )
      )}
    </FloatButtonWrapper>
  )
}

const FloatButtonWrapper = styled.div`
  position: fixed;
  right: 25rem;
  bottom: 25rem;
  .float {
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60rem;
      height: 60rem;
      background-color: ${({ theme }) => theme.btnDark};
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      z-index: 100;
    }
  }
  svg {
    width: 25rem;
    height: 25rem;
    path {
      fill: #fff;
    }
  }
`

const AnimatedWrapper = styled(animated.div)`
  color: ${({ theme }) => theme.textColor};
  svg {
    display: block;
  }
`
