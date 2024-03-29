export const getMinute = function (time) {
    const minute = Math.floor(time / 60000);
    return minute < 10 ? `0${minute}` : minute;
}

export const getSecond = function (time) {
    const second = Math.floor(time / 1000 % 60);
    return second < 10 ? `0${second}` : second;
}