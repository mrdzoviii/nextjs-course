import { ReactElement } from "react";
import MainHeader from "./main-header";

export interface ILayoutProps {
  children: React.ReactElement | React.ReactElement[];
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
}
