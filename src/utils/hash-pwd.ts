import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac(
    'sha512',
    'dasadfujbugdsaiygduoigfodghihadiughfugsvdyfvbaodjoijqo8whjqy1279834y127h9219dh21dasndl;1942385098423h7nc4850127527136482ghdjfbsakj',
  );
  hmac.update(p);
  return hmac.digest('hex');
};
