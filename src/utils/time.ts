export const timeData = (time: number) => {
  const minute = Math.floor(time / 60000);
  const second = Math.floor((time / 1000) % 60);
  return {
    minute: minute < 10 ? `0${minute}` : `${minute}`,
    second: second < 10 ? `0${second}` : `${second}`,
  };
};
