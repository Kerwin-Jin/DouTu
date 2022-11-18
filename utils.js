// 处理耗时
export const formatDuring = (duration: number | string): string => {
  let resStr = '';
  const seconds = Number(duration) / 1000;
  const daySec = 24 * 60 * 60;
  const hourSec = 60 * 60;
  const minuteSec = 60;
  const dd = Math.floor(seconds / daySec);
  const hh = Math.floor((seconds % daySec) / hourSec);
  const mm = Math.floor((seconds % hourSec) / minuteSec);
  const ss = Math.floor(seconds % minuteSec);
  if (dd > 0) {
    resStr = `${dd}天${hh}小时${mm}分${ss}秒`;
  } else if (hh > 0) {
    resStr = `${hh}小时${mm}分${ss}秒`;
  } else if (mm > 0) {
    resStr = `${mm}分${ss}秒`;
  } else {
    resStr = `${ss}秒`;
  }

  return resStr;
};
