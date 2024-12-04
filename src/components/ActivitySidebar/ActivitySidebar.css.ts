import { style } from '@vanilla-extract/css';

export const sidebar = style({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '300px',
  height: '100%',
  backgroundColor: '#f8f9fa',
  borderLeft: '1px solid #dee2e6',
  boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1000,
});

export const closeButton = style({
  alignSelf: 'flex-end',
  margin: '10px',
  padding: '5px 10px',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  ':hover': {
    color: 'red',
  },
});

export const title = style({
  padding: '10px',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center',
  borderBottom: '1px solid #dee2e6',
});

export const logList = style({
  padding: '10px',
  listStyle: 'none',
  overflowY: 'auto',
  margin: 0,
});

export const logItem = style({
  padding: '5px 0',
  borderBottom: '1px solid #dee2e6',
});

export const logAction = style({
  display: 'block',
  fontSize: '14px',
  fontWeight: 'bold',
});

export const logDate = style({
  display: 'block',
  fontSize: '12px',
  color: '#6c757d',
});
