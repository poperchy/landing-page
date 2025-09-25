import React from 'react';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="lg:absolute top-0 left-0 right-0 z-10">
      <div className="w-full pt-[35px] lg:pt-[80.16px]">
        <div className="flex justify-center items-center">
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;
