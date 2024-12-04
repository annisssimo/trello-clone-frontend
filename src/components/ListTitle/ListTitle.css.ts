import { style } from '@vanilla-extract/css';

export const title = style({
  margin: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  borderRadius: '8px',
  transition: 'background-color 0.3s, padding 0.3s, border-radius 0.3s',
});

export const listTitleContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginRight: '6px',
});

export const dots = style({
  height: '28px',
  width: '28px',
  padding: '6px',
  borderRadius: '7px',
  ':hover': {
    backgroundColor: '#091E4224',
  },
});
