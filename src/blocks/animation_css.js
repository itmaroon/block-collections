import { css, keyframes } from 'styled-components';

export const anime_comp = (attributes) => {


  return (
    css`
      &.fadeTrigger {
        opacity: 0;
      }
      &.${attributes.pattern}{
        animation-name: ${attributes.pattern};
        animation-delay: ${attributes.delay}s;
        animation-duration: ${attributes.duration}s;
        animation-fill-mode: forwards;
        opacity: 0;
      }
    `
  )
}