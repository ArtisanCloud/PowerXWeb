import * as CryptoJS from 'crypto-js';

async function encodePassword(password: string) {
  const hashResult = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

  return hashResult;
}

// async function encodePassword(password: string): Promise<string> {
//   try {
//     const encoder = new TextEncoder();
//     const data = encoder.encode(password);
//     console.log(data);
//     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//     console.log(hashBuffer);
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
//     const hashResult = hashArray.reduce(
//       (str, byte) => str + byte.toString(16).padStart(2, '0'),
//       ''
//     );
//     return hashResult;
//   } catch (error) {
//     console.error('An error occurred:', error);
//     // 处理错误或提供适当的回退方案
//     return ''; // 返回一个空的哈希值或其他适当的值
//   }
// }

export default encodePassword;
