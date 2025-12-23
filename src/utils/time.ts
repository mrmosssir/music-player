export const timeData = (time: number) => {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  return {
    minute: minute < 10 ? `0${minute}` : `${minute}`,
    second: second < 10 ? `0${second}` : `${second}`,
  };
};
