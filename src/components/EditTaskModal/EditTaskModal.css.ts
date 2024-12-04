import { style } from '@vanilla-extract/css';

export const saveButton = style({
  display: 'block',
  marginTop: '10px',
  backgroundColor: '#028ad9',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
  ':hover': {
    backgroundColor: '#0073b5',
  },
});

export const buttonContainer = style({
  display: 'flex',
});

export const deleteButton = style({
  display: 'block',
  margin: '10px 0 0 10px',
  backgroundColor: 'transparent',
  color: 'red',
  padding: '8px 16px',
  border: '1px solid red',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
  ':hover': {
    backgroundColor: 'red',
    color: '#fff',
  },
});
