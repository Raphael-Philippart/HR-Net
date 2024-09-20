import React from "react";
import "./Logo.css";

interface LogoProps {
  pathLogo: string;
  altText: string;
  containerWidth?: string | number;
  containerHeight?: string | number;
  imgClassName?: string;
  containerClassName?: string;
}

const Logo: React.FC<LogoProps> = ({
  pathLogo,
  altText = "Logo",
  containerWidth = 25,
  containerHeight = 25,
  imgClassName = "",
  containerClassName = "",
}: LogoProps) => {
  return (
    <div className={`${containerClassName} w-[${containerWidth}px] h-[${containerHeight}px]`}>
      <img src={pathLogo} alt={altText} className={`logo ${imgClassName}`} />
    </div>
  );
};

export default Logo;
