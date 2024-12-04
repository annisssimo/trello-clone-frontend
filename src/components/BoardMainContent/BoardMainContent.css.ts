import { style } from '@vanilla-extract/css';

export const boardMainContentContainer = style({
  display: 'flex',
  gap: '20px',
  alignItems: 'flex-start',
  padding: '10px 20px',
  overflowX: 'auto',
  overflowY: 'hidden',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  maxWidth: 'calc(100vw - 233px)',
});
