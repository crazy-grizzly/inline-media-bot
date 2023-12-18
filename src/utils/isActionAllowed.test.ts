import { isActionAllowed } from './isActionAllowed';

describe('isActionAllowed', () => {
  it('should allow when no username is provided', () => {
    expect(isActionAllowed()).toBe(true);
    // @ts-expect-error Testing invalid input
    expect(isActionAllowed(null)).toBe(true);
    expect(isActionAllowed('')).toBe(true);
    // @ts-expect-error Testing invalid input
    expect(isActionAllowed(1)).toBe(true);
  });

  it('should properly check using valid params', () => {
    const ALLOW_FOR = ['bob', 'john'];

    expect(isActionAllowed('bob', [])).toBe(true);
    expect(isActionAllowed('bob', ALLOW_FOR)).toBe(true);
    expect(isActionAllowed('john', ALLOW_FOR)).toBe(true);
    expect(isActionAllowed('jane', ALLOW_FOR)).toBe(false);
  });
});