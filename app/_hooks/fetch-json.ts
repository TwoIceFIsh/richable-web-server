import { BasicType } from "@/app/_type/basic-type";

export async function fetchJson<T>(
  url: any,
  options?: RequestInit,
): Promise<BasicType<T>> {
  const data = await fetch(url, options);
  return (await data.json()) as BasicType<T>;
}