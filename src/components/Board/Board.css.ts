import { style } from '@vanilla-extract/css';

export const boardContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  borderBottom: '1px solid #ddd',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#eee',
  },
});

export const dotsButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  ':hover': {
    color: 'red',
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
