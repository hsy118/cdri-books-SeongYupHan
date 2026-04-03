import type { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return <main className="pt-20 mx-auto w-full max-w-[960px]">{children}</main>;
}
