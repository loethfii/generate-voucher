import crypto from 'crypto';

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateUniqueCode(length: number) {
  let code;
  const codesSet = new Set();

  do {
    code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomBytes(1)[0] % characters.length;
      code += characters[randomIndex];
    }
  } while (codesSet.has(code));
  codesSet.add(code);

  return code;
}
