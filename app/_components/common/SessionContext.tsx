"use client";

import { createContext } from "react";
import { useCurrentSession } from "@/app/_hooks/use-current-session";

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}
// Define the session type
interface Session {
  session:
    | {
        role: "ADMIN" | "USER";
        tag: string;
        name: string;
        group: string;
        id: string;
        email: string;
        image: string;
        isTwoFactorEnabled: boolean;
        isOAuth: boolean;
        username: string;
      }
    | undefined;
  status: string;
}

// Create the context with the correct type
export const MySession = createContext<Session | null>(null);
export default function SessionContext({ children }: ProvidersProps) {
  const data = useCurrentSession();
  return <MySession.Provider value={data}>{children}</MySession.Provider>;
}