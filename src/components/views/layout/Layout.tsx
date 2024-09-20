import { FC } from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../../../components/uix/nav/MainNav";

interface TLayoutProps {}

const Layout: FC<TLayoutProps> = (props: TLayoutProps) => {
  return (
    <>
      <MainNav />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
