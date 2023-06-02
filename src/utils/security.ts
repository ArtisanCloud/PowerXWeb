export async function encodePassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashResult = hashArray.reduce(
    (str, byte) => str + byte.toString(16).padStart(2, '0'),
    ''
  );
  return hashResult;
}

export default encodePassword;
