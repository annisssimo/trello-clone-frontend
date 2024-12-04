import { style } from '@vanilla-extract/css';

export const sidebarContainer = style({
  width: '233px',
  borderRight: '1px solid #ddd',
  backgroundColor: '#f9f9f9c2',
  height: '100vh',
  flexShrink: '0',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '16px',
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
  backgroundColor: '#c9c8c4',
  fontWeight: 'bold',
});
