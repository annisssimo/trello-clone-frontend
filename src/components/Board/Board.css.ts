import { style } from '@vanilla-extract/css';

export const boardContainer = style({
  padding: '8px 0',
  borderBottom: '1px solid #ddd',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#eee',
  },
});
