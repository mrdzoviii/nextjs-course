import MainHeader from "./main-header";

export interface ILayoutProps {
  children: React.ReactElement;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
}
