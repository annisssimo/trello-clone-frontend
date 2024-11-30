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

export const activityButton = style({
  padding: '8px',
  border: '1px solid #026aa7',
  borderRadius: '7px',
  transition: 'background-color 0.3s, padding 0.3s, border-radius 0.3s',
  ':hover': {
    backgroundColor: '#026aa7',
    color: '#fff',
  },
});
