import { style } from '@vanilla-extract/css';

export const title = style({
  margin: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  borderRadius: '8px',
  transition: 'background-color 0.3s, padding 0.3s, border-radius 0.3s',
});
