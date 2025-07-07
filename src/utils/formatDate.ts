const ONE_MINUTE = 60;
const ONE_HOUR = 60 * 60;
const ONE_DAY = 60 * 60 * 24;
const ONE_WEEK = 60 * 60 * 24 * 7;

export function formatDate(rawDate: string | Date): string {
  const date = new Date(rawDate);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // 초 단위 차이

  // 1분 미만
  if (diff < ONE_MINUTE) {
    return '방금 전';
    // 1시간 미만
  } else if (diff < ONE_HOUR) {
    const minutes = Math.floor(diff / 60);
    return `${minutes}분 전`;
    // 24시간 미만
  } else if (diff < ONE_DAY) {
    const hours = Math.floor(diff / 3600);
    return `${hours}시간 전`;
    // 1주일 미만
  } else if (diff < ONE_WEEK) {
    const days = Math.floor(diff / 86400);
    return `${days}일 전`;
  }

  // 그 외 YYYY.MM.DD 형식
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default function FullDate(rawDate: string): string {
  const date = new Date(rawDate);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
