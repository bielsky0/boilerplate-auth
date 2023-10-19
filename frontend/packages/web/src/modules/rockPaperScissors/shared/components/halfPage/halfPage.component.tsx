import { ReactNode } from 'react';

export interface HalfPageProps {
  children: ReactNode;
}

export const HalfPage = ({ children }: HalfPageProps) => {
  return <div className="flex h-full w-full">{children}</div>;
};
