/**
 * ThreadType - 스레드의 기본 반환 타입
 * */
export type ThreadType = {
  t_id: string;
  t_content: string;
  t_createdAt: Date;
  t_updatedAt: Date;
  t_view?: number;
  t_like?: number;
  t_user: t_user;
  t_comments: t_comments[];
};

type t_user = {
  id: string;
  name: string;
  image: string;
};

export type t_comments = {
  c_id: string;
  c_content: string;
  c_depth: number;
  c_createdAt: Date;
  c_updatedAt: Date;
  c_user: c_user;
};

type c_user = {
  id: string;
  name: string;
  image: string;
};