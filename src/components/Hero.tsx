import React from 'react';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            200 фриспинов за регистрацию
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
