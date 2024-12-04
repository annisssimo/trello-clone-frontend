import { style } from '@vanilla-extract/css';

export const confirmButton = style({
  backgroundColor: '#f44336',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
  marginRight: '10px',
  borderRadius: '7px',
});

export const cancelButton = style({
  backgroundColor: '#ccc',
  padding: '10px 20px',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '7px',
});
