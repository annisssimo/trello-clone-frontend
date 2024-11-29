import { globalStyle } from '@vanilla-extract/css';

globalStyle('*, *::before, *::after', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('body', {
  lineHeight: 1.5,
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#fff',
  color: '#000',
  textRendering: 'optimizeLegibility',
  overflowX: 'hidden',
});

globalStyle('.flexContainer', {
  display: 'flex',
});

globalStyle('button', {
  cursor: 'pointer',
});

globalStyle('.error', {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  border: '1px solid #f5c6cb',
  padding: '0.2rem 0.3rem',
  borderRadius: '5px',
  fontSize: '0.8rem',
  marginBottom: '1rem',
});
