import { style } from '@vanilla-extract/css';

export const headerContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 16px',
  height: '60px',
  backgroundColor: '#026aa7',
  color: '#fff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

export const logo = style({
  width: '75px',
  height: '32px',
  cursor: 'pointer',
  backgroundImage: 'url(https://trello.com/assets/d947df93bc055849898e.gif)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  ':hover': {
    backgroundImage: 'url(https://trello.com/assets/87e1af770a49ce8e84e3.gif)',
  },
});

export const profileIcon = style({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: 'thin',
  color: '#026aa7',
  cursor: 'pointer',
});
