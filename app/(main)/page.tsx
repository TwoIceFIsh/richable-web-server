"use client";
import React, { useEffect, useState, useTransition } from "react";
import WriteModal from "@/app/_components/thread/WriteModal";
import { PulseLoader, SyncLoader } from "react-spinners";
import ThreadWrite from "@/app/_components/thread/ThreadWrite";
import ThreadHeader from "@/app/_components/thread/ThreadHeader";
import MainLayout from "@/app/(main)/layout";
import { ThreadType } from "@/app/_type/thread-type";
import { BasicType } from "@/app/_type/basic-type";
import NewThread from "@/app/_components/thread/NewThread";

const MainPage = () => {
  const [isPending, startTransitionBottom] = useTransition();
  const [isPending2, startTransitionTop] = useTransition();
  const [writeModal, setWriteModal] = useState(false);
  const [page, setPage] = useState(1);
  const [threads, setThreads] = useState<ThreadType[]>([]);
  const [end, setEnd] = useState(false);

  // 초기 데이터 수집 액션
  useEffect(() => {
    startTransitionBottom(async () => {
      const fetchFirstThread = async () => {
        const newThreads = await fetch("/api/v1/threads", {
          method: "POST",
          body: JSON.stringify({ take: 3, page: 0 }),
        });

        const result = (await newThreads.json()) as BasicType<ThreadType[]>;
        setThreads(result?.data as ThreadType[]);
        if ((result?.data?.length as number) < 3) setEnd(true);
      };
      fetchFirstThread().then();
    });
  }, []);

  // 추가 데이터 수집
  useEffect(() => {
    startTransitionBottom(async () => {
      if (end) return; // This stops the execution if `end` is true
      const newThreads = await fetch("/api/v1/threads", {
        method: "POST",
        body: JSON.stringify({ take: 3, page: page }),
      });

      const data = (await newThreads.json()) as BasicType<ThreadType[]>;

      if (!data.data || data.data.length === 0) {
        setEnd(true);
      } else {
        setThreads((prevThreads) => [
          ...prevThreads,
          ...(data.data as ThreadType[]),
        ]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // 새로운 데이터 수집 액션
  const fetchNewThread = async () => {
    startTransitionTop(async () => {
      let body;
      if (threads.length === 0) {
        body = JSON.stringify({ take: 3, page: 0 });
      } else {
        body = JSON.stringify({ date: threads[0]?.t_createdAt });
      }

      const newThreads = await fetch("/api/v1/threads", {
        method: "POST",
        body: body,
      });
      const data = (await newThreads.json()) as BasicType<ThreadType[]>;

      setThreads((prevThreads) => [
        ...(data.data as ThreadType[]),
        ...prevThreads,
      ]);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  // 교차점이 발생했을 때 실행되는 콜백 함수
  useEffect(() => {
    if (end) return; // This stops the execution if `end` is true
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      startTransitionBottom(() => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, // Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });
    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, [end]);

  return (
    <MainLayout handleHomeIconClick={fetchNewThread}>
      <>
        {writeModal && (
          <>
            <div
              className={
                "fixed left-0 top-0 z-20 h-full w-full bg-gray-400 opacity-50"
              }
            ></div>
            <div className={"z-30"}>
              <WriteModal
                setWriteModal={setWriteModal}
                writeModal={writeModal}
              />
            </div>
          </>
        )}
        <div className={"flex w-full items-center justify-center sm:px-20"}>
          <div className={"h-full w-[800px]"}>
            {/* 상단 회원님을 위한 추천 */}
            <div
              className={
                "hidden items-center justify-center gap-x-6 py-5 text-center text-xl font-bold sm:flex"
              }
            >
              <ThreadHeader />
            </div>
            <div
              className={
                "flex flex-col pt-16 sm:rounded-2xl sm:border-2 sm:py-0 sm:shadow-md"
              }
            >
              {/* Write Box */}
              <ThreadWrite setWriteModal={setWriteModal} />
              <hr />
              {isPending2 && (
                <div className={"flex w-full justify-center p-6"}>
                  <PulseLoader color="#7c3aed" />
                </div>
              )}
              {threads?.map((thread, idx) => (
                <NewThread thread={thread} key={idx} href={`/${thread.t_id}`} />
              ))}

              {isPending && !end && (
                <div className={"flex h-20 w-full items-center justify-center"}>
                  <SyncLoader color="#7c3aed" />
                </div>
              )}

              {!end ? (
                <div id="observer" style={{ height: "1px" }}></div>
              ) : (
                <div
                  className={
                    "flex h-20 items-center justify-center text-center text-2xl font-bold"
                  }
                >
                  <div>⛔ 더 이상 데이터가 없습니다.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </MainLayout>
  );
};

export default MainPage;