import React, { FC } from "react";
import Logo from "../../uix/logo/Logo";

interface THomeProps {}

const Home: FC<THomeProps> = (props: THomeProps) => {
  return (
    <div className='flex flex-col items-center mt-10'>
      <a className='flex h-full w-full align-middle justify-center ml-1' href='/employees'>
        <Logo
          pathLogo='./images/weath_health_logo.png'
          altText='Logo Wealth Health'
          containerWidth={90}
          containerHeight={90}
        />
      </a>
    </div>
  );
};

export default Home;
