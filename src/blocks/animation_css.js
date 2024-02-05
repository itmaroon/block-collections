import { css, keyframes } from 'styled-components';

export const anime_comp = (attributes) => {
  const flipDownAnime = keyframes`
    from {
      transform: perspective(2500px) rotateX(100deg);
      opacity: 0;
    }

    to {
      transform: perspective(2500px) rotateX(0);
      opacity: 1;
    }
  `;

  const fadeRightAnime = keyframes`
    from {
      opacity: 0;
      transform: translateX(100px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  `

  const fadeLeftAnime = keyframes`
    from {
      opacity: 0;
      transform: translateX(-100px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  `

  const fadeUpAnime = keyframes`
    from {
      opacity: 0;
      transform: translateY(100px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  `


  //キーフレームの選択
  const keyframeMap = {
    'flipDown': flipDownAnime,
    'fadeRight': fadeRightAnime,
    'fadeUp': fadeUpAnime,
    'fadeLeft': fadeLeftAnime
  };

  return (
    css`
      &.fadeTrigger {
        opacity: 0;
      }
      &.${attributes.pattern}{
        animation-name: ${keyframeMap[attributes.pattern]};
        animation-delay: ${attributes.delay}s;
        animation-duration: ${attributes.duration}s;
        animation-fill-mode: forwards;
        opacity: 0;
      }
    `
  )
}