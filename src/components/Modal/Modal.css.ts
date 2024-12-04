import { style } from '@vanilla-extract/css';

export const modalOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

export const modalContent = style({
  position: 'relative',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});

export const closeButton = style({
  position: 'absolute',
  top: '10px',
  right: '10px',
  padding: '6px 12px',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
