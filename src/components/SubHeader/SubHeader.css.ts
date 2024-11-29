import { style } from '@vanilla-extract/css';

export const subHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f4f4f4',
  padding: '10px 20px',
  borderBottom: '2px solid #ddd',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333',
  width: 'calc(100vw - 233px)',
});

export const title = style({
  cursor: 'pointer',
  transition: 'background-color 0.3s, padding 0.3s, border-radius 0.3s',
  padding: '2px 6px',
  ':hover': {
    backgroundColor: '#bfbfbf',
    borderRadius: '4px',
  },
});

export const input = style({
  fontSize: '24px',
  border: 'none',
  background: 'transparent',
});

export const dots = style({
  cursor: 'pointer',
  fontSize: '20px',
  color: '#888',
  userSelect: 'none',
});
