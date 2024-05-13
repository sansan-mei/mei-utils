/**
 * Description placeholder
 *
 * @export
 * @param {string} cookieName
 * @returns {string}
 */
export function getCookieValue(cookieName: string): string {
  const cookieValue = document.cookie.match(
    `(^|;)\\s*${cookieName}\\s*=\\s*([^;]+)`,
  );
  return decodeURIComponent((cookieValue ? cookieValue.pop() : "") as string);
}

/**
 * Description placeholder
 *
 * @export
 * @param {string} name
 * @param {string} value
 * @param {number} [days=30]
 */
export function setCookieValue(name: string, value: string, days = 30) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  name = encodeURIComponent(name);
  value = encodeURIComponent(value);
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

/**
 * Description placeholder
 *
 * @export
 * @param {string} text
 * @returns {Promise<string> | Promise<never>}
 */
export function copyToClip(text: string) {
  return new Promise((resolve, reject) => {
    try {
      const input: HTMLTextAreaElement = document.createElement("textarea");
      input.setAttribute("readonly", "readonly");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      if (document.execCommand("copy")) document.execCommand("copy");
      document.body.removeChild(input);
      resolve(text);
    } catch (error) {
      reject(error);
    }
  });
}
