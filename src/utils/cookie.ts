/**
 * 獲取 cookie 內容
 * @param name - cookie 名稱
 * @returns 獲取的 cookie 值
 */
const get = (name: string): string => {
  if (!document.cookie) return '';

  const arr = document.cookie.split('; ');

  return arr.find((item) => item.indexOf(name) === 0)?.split(`${name}=`)[1] || '';
};

/**
 * 設置 cookie 內容
 * @param name - cookie 名稱
 * @param value - cookie 值
 * @param expires 以毫秒為單位
 */
const set = (name: string, value: any, expires?: number): void => {
  const date = new Date();

  if (expires) date.setTime(date.getTime() + (expires * 1000));

  document.cookie = `${name}=${value};${expires ? 'expires=' + date.toUTCString() : 'max-age=0'};path=/`;
};


/**
 * 確定 cookie 是否存在
 * @param name - cookie 名稱
 * @returns 是否存在
 */
const check = (name: string): boolean => {
  return document.cookie.split('; ').some((item) => item.indexOf(`${name}=`) === 0);
};

const cookie = { get, set, check };

export default cookie;