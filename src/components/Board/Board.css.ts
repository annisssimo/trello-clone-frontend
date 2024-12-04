import { style } from '@vanilla-extract/css';

export const boardContainer = style({
  borderBottom: '1px solid #ddd',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#d6d5d2',
  },
});

export const board = style({
  margin: '0 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '3px 0',
});
