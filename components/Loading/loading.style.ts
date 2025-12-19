import styled, { css } from 'styled-components';

export const Overlay = styled.div`
  z-index: 9999;
  overflow: show;
  margin: auto;
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
`;

export const Wrapper = styled.div<any>`
  display: grid;
  place-items: ${({ placeItem }) => (placeItem || 'center')};

  height: 100vh;
`;

export const BouncingElement = styled.div<any>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};

  ${({ disableAnimation, typeAnimation }: any): any => !disableAnimation
    && css`
      animation: ${typeAnimation
    ? `${typeAnimation} 0.6s ease-in-out infinite alternate`
    : 'bounce2 0.6s ease-in-out infinite alternate'};
    `}

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  &:nth-child(4) {
    animation-delay: 0.6s;
  }

  @keyframes bounce2 {
    0%,
    50% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-18px);
    }
  }

  @keyframes bounce3 {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }

    40% {
        transform: translateY(-15px);
    }

    60% {
        transform: translateY(-18px);
    }
}

    40% {
      transform: translateY(-15px);
    }

    60% {
      transform: translateY(-18px);
    }
  }

  @keyframes bounce4 {
    0%,
    50% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-3px);
    }
  }
`;
