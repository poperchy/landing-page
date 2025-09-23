import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-6">
          <h1 className="text-2xl font-bold text-gray-900">Логотип</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
