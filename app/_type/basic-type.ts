/**
 * 공통 반환 타입
 * */
export type BasicType<T> = {
  result: boolean;
  createdAt: Date;
  data?: T;
};