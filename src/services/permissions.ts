const ALLOW_FOR = process.env.ALLOW_FOR?.split(',') || [];

export const isActionAllowed = (username?: string, allowedUsernames = ALLOW_FOR) => {
  if (username && typeof username === 'string' && allowedUsernames.length && !allowedUsernames.includes(username)) {
    return false;
  }

  return true;
};