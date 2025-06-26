export function formatDate(rawDate: string): string {
  const date = new Date(rawDate);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // 초 단위 차이

  // 1분 미만
  if (diff < 60) {
    return "방금 전";
  // 1시간 미만
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes}분 전`;
  // 24시간 미만
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours}시간 전`;
  // 1주일 미만
  } else if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return `${days}일 전`;
  }

  // 그 외 YYYY.MM.DD 형식
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
}
