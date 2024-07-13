import { BasicType } from "@/app/_type/basic-type";

/**
 * ResponseData - 응답 데이터를 반환합니다.
 * @param data - 응답 데이터
 * @param result - 응답 결과
 */
export async function ResponseData<T>(data: T, result: boolean) {
  const response: BasicType<T> = {
    result: result,
    createdAt: new Date(),
    data: data,
  };

  return response;
}