import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}
  // Montserrat
  @font-face {
    font-family: 'Montserrat';
    font-weight: 600;
    src: url('/fonts/Montserrat/Montserrat-SemiBold.woff2') format('woff2'),
         url('/fonts/Montserrat/Montserrat-SemiBold.woff') format('woff'),
         url('/fonts/Montserrat/Montserrat-SemiBold.svg#Montserrat-SemiBold') format('svg');
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
  }
  // SaolDisplay
  @font-face {
    font-family: 'SaolDisplay';
    font-weight: 600;
    src: url('/fonts/SaolDisplay/SaolDisplay-Regular.woff2') format('woff2'),
         url('/fonts/SaolDisplay/SaolDisplay-Regular.woff') format('woff'),
         url('/fonts/SaolDisplay/SaolDisplay-Regular.svg#SaolDisplay-Regular') format('svg');
  }
  // AppleSDGothicNeo
  @font-face {
    font-family: 'AppleSDGothicNeo';
    font-weight: 100;
    src: url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoT.woff2') format('woff2'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoT.woff') format('woff'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoT.ttf') format('truetype');
  }
  @font-face {
    font-family: 'AppleSDGothicNeo';
    font-weight: 300;
    src: url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoL.woff2') format('woff2'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoL.woff') format('woff'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoL.ttf') format('truetype');
  }
  @font-face {
    font-family: 'AppleSDGothicNeo';
    font-weight: 400;
    src: url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoM.woff2') format('woff2'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoM.woff') format('woff'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoM.ttf') format('truetype');
  }
  @font-face {
    font-family: 'AppleSDGothicNeo';
    font-weight: 600;
    src: url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoSB.woff2') format('woff2'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoSB.woff') format('woff'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoSB.ttf') format('truetype');
  }
  @font-face {
    font-family: 'AppleSDGothicNeo';
    font-weight: 700;
    src: url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoB.woff2') format('woff2'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoB.woff') format('woff'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoB.ttf') format('truetype');
  }
  @font-face {
    font-family: 'AppleSDGothicNeo';
    font-weight: 800;
    src: url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoEB.woff2') format('woff2'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoEB.woff') format('woff'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoEB.ttf') format('truetype');
  }
  @font-face {
    font-family: 'AppleSDGothicNeo';
    font-weight: 900;
    src: url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoH.woff2') format('woff2'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoH.woff') format('woff'),
         url('/fonts/AppleSDGothicNeo/AppleSDGothicNeoH.ttf') format('truetype');
  }

  html,
  body {
    position: relative;
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    font-family: 'AppleSDGothicNeo';
    font-weight: 300;
    font-size: 1px;
    line-height: 1.6;
    word-break: keep-all;
    ${({ theme }) => theme.lg`
      font-size: 0.9px;
    `}
    ${({ theme }) => theme.md`
      font-size: 0.9px;
    `}
    ${({ theme }) => theme.sm`
      font-size: 0.9px;
    `}
  }
  body {
    font-size: 16rem;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  a {
    color: ${({ theme }) => theme.textColor};
    text-decoration: none;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  // home
  .page-home {
    body {
      transition: background 0.3s;
    }
    &.s-active {
      background: ${({ theme }) => theme.bgPoint2};
      body {
        background: ${({ theme }) => theme.bgPoint2};
      }
      .drop__btn {
        color: #fff;
        background-color: ${({ theme }) => theme.btnPoint};
      }
    }
  }  

  // point
  .page-point {
    background: ${({ theme }) => theme.bgPoint};
    body {
      background: ${({ theme }) => theme.bgColor};
    }
  }

  // about
  .page-about {
    .dimmed__child {
      height: 100%;
    }
  }
`
