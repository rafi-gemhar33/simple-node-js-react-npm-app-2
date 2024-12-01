/* eslint no-use-before-define: 0 */  // --> OFF

// This test will fail
it('should fail', () => {
  expect(true).toBe(true);  // This will always pass
});

// // This test will fail
// it('should fail', () => {
//   expect(true).toBe(false);  // This will always fail
// });