"use client";
// This hook doesn't rely on the session provider
import { getSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

export const useCurrentSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  // Changed the default status to loading
  const [status, setStatus] = useState<string>("loading");
  const pathName = usePathname();

  const retrieveSession = useCallback(async () => {
    try {
      const sessionData = await getSession();
      if (sessionData) {
        setSession(sessionData);
        setStatus("authenticated");
        return;
      }

      setStatus("unauthenticated");
    } catch (error) {
      setStatus("unauthenticated");
      setSession(null);
    }
  }, []);

  useEffect(() => {
    // We only want to retrieve the session when there is no session
    if (!session) {
      retrieveSession().then(() => null);
    }

    // use the pathname to force a re-render when the user navigates to a new page
  }, [retrieveSession, session, pathName]);

  return { session: session?.user, status };
};