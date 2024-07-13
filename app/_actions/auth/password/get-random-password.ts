/**
 * 랜덤 비밀번호를 생성합니다.
 * */

export const getRandomPassword = () => {
  return Math.random().toString(16).substring(2, 14);
};