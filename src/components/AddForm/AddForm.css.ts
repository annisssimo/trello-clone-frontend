import { style } from '@vanilla-extract/css';

export const formContainer = style({
  width: '260px',
  padding: '8px',
  borderRadius: '12px',
  backgroundColor: '#f1f2f4',
  flexShrink: '0',
});

export const textArea = style({
  height: '32px',
  width: '100%',
  maxHeight: '256px',
  padding: '8px 12px',
  overflow: 'hidden',
  borderRadius: '4px',
  color: '#172B4D',
  resize: 'none',
  fontFamily: 'inherit',
  fontWeight: '500',
});

export const addButton = style({
  border: 'none',
  backgroundColor: '#0C66E4',
  boxShadow: 'none',
  color: '#ffffff',
  padding: '6px 12px',
  borderRadius: '3px',
});

export const cancelButton = style({
  border: 'none',
  backgroundColor: 'none',
  fontSize: '22px',
  position: 'relative',
  top: '6px',
  marginLeft: '6px',
  cursor: 'pointer',
});
