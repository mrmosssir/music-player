
const get = function (name) {
  if (!document.cookie) return false;
  const arr = document.cookie.split('; ');
  return arr.find((item) => item.indexOf(name) === 0)?.split(`${name}=`)[1]
};

const set = function (name, value, expires) {
  const date = new Date();
  if (expires) date.setTime(date.getTime() + (expires * 1000));
  document.cookie = `${name}=${value};${expires ? 'expires=' + date.toUTCString() : 'max-age=0'};path=/`;
};

const check = function (name) {
  return document.cookie.split('; ').some((item) => item.indexOf(`${name}=`) === 0);
};

const cookie = { get, set, check };

export default cookie;