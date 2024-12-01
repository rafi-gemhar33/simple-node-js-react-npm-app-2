import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// This test will fail
it('should fail', () => {
  expect(true).toBe(true);  // This will always pass
});

// // This test will fail
// it('should fail', () => {
//   expect(true).toBe(false);  // This will always fail
// });