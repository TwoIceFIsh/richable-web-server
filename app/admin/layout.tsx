import Navbar from "@/app/admin/_component/navbar";
import "../globals.css";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div
      className={
        "flex h-full w-full flex-col items-center justify-center gap-y-10 bg-sky-500"
      }
    >
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;