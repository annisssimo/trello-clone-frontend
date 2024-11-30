import { style } from '@vanilla-extract/css';

export const dots = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  height: '24px',
  width: '24px',
  borderRadius: '7px',
  ':hover': {
    backgroundColor: '#b5b0b0',
  },
});
