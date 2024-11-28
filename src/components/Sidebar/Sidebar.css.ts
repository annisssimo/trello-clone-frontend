import { style } from '@vanilla-extract/css';

export const sidebarContainer = style({
  width: '250px',
  padding: '16px',
  borderRight: '1px solid #ddd',
  backgroundColor: '#f9f9f9',
  height: '100vh',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
  fontSize: '18px',
  fontWeight: 'bold',
});

export const boardList = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const plusButton = style({
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
});

export const activeBoard = style({
  backgroundColor: '#f0f0f0',
  cursor: 'pointer',
  fontWeight: 'bold',
});
