import { style } from '@vanilla-extract/css';

export const composerButton = style({
  width: '246px',
  padding: '12px',
  borderRadius: '12px',
  backgroundColor: '#f5f5f5',
  cursor: 'pointer',
  transition: 'background-color 0.3s, padding 0.3s, border-radius 0.3s',
  color: '#172B4D',
  textAlign: 'left',
  flexShrink: '0',
  border: 'none',
  ':hover': {
    backgroundColor: '#ebebeb',
  },
});
