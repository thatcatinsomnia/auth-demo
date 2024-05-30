import { type ReactNode } from 'react';

export default function FullHeightContent({ children }: { children: ReactNode}) {
  return <div className="h-[calc(100dvh-80px)]">{children}</div> 
}
