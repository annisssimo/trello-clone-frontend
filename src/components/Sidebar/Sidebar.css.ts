import { style } from '@vanilla-extract/css';

export const sidebarContainer = style({
  width: '233px',
  padding: '16px',
  borderRight: '1px solid #ddd',
  backgroundColor: '#f9f9f9',
  height: '100vh',
  flexShrink: '0',
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

export const createBoardButton = style({
  display: 'block',
  marginTop: '10px',
  backgroundColor: '#028ad9',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
});
