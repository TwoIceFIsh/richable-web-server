/**
 * timeAgo - 시간을 가지고 시간이 얼마나 지났는지를 문자열로 반환합니다.
 * */
export function timeAgo(dateString: Date) {
  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes + "분 전";
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours + "시간 전";
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return diffInDays + "일 전";
  }
  const diffInWeeks = Math.floor(diffInDays / 7);
  return diffInWeeks + "주 전";
}