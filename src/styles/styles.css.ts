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
});
