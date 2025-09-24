import React from 'react';
import Rectangle from './Rectangle';
import fireBorder from '../../assets/images/fire-border.gif';
import character from '../../assets/images/character.png';
import spark from '../../assets/images/spark.png';
import gold from '../../assets/images/gold.png';
import goldTop from '../../assets/images/gold2.png';

const Hero: React.FC = () => {
  return (
    <section id="home" className="text-white ml-auto">
      <div className="hero-container">
        <div className="gold-top">
          <img src={goldTop} loading="lazy" alt="gold" className="h-auto" />
        </div>
        <div className="text-center font-mts hero-frame relative p-[50px] pt-[30px] z-10">
          <div className="fire-border">
            <img
              src={fireBorder}
              loading="lazy"
              alt="200 фриспинов за регистрацию"
              className="h-[95%] w-[106%] max-w-[106%]"
            />
          </div>
          <div className="fire-border fire-border--reverse">
            <img
              src={fireBorder}
              loading="lazy"
              alt="fire-border"
              className="h-[95%] w-[106%] max-w-[106%]"
            />
          </div>
          <Rectangle />
          <div className="absolute top-[-12px] left-[50%] translate-x-[-50%]">
            <h1 className="flex flex-col items-center">
              <span
                className="custom-text-shadow-lg text-[24.63px] uppercase lg:text-[274.43px] leading-[0.8]
             bg-text-gradient bg-clip-text text-transparent drop-shadow-customLarge
             text-stroke text-stroke-8 text-stroke-black animate-scale-pulse"
              >
                200
              </span>
              <span className="text-[39.6px] uppercase lg:text-[77.49px] text-[#00BDFD] leading-[1] mt-[42px] ">
                фриспинов
              </span>
              <span
                className="text-[24.63px] uppercase lg:text-[48.19px] font-extrabold text-fill 
                     text-fill-white bg-clip-text drop-shadow-custom text-stroke text-stroke-2 text-stroke-black leading-[1] mt-[17px]"
              >
                за регистрацию
              </span>
            </h1>
          </div>
        </div>
        <div className="character">
          <img
            src={character}
            loading="lazy"
            alt="character"
            className="object-contain h-full"
          />
        </div>
        <div className="spark">
          <img src={spark} loading="lazy" alt="spark" className="h-auto" />
        </div>
        <div className="gold">
          <img src={gold} loading="lazy" alt="gold" className="h-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
