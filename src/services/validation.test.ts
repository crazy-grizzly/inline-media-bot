import { isValidUrl } from './validation';

describe('Validation Service', () => {
  describe('isValidUrl', () => {
    it('should validate instagram url properly', () => {
      const exampleValidUrl = 'https://www.instagram.com/reel/C0t0JwkLdX8/?utm_source=ig_web_copy_link';
  
  
      expect(isValidUrl(exampleValidUrl)).toBe(true);
    });
  });
});
