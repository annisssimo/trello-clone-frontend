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

export const dotsButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  height: '28px',
  width: '28px',
  borderRadius: '7px',
  ':hover': {
    backgroundColor: '#b5b0b0',
  },
});

export const deleteButton = style({
  backgroundColor: '#f44336',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
  marginRight: '10px',
});

export const cancelButton = style({
  backgroundColor: '#ccc',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
});
