import React from 'react';
import Rectangle from './Rectangle';
import fireBorder from '@/assets/images/fire-border.gif';
import character from '@/assets/images/Character.png';
import characterMobile from '@/assets/images/Character-mob.png';
import spark from '@/assets/images/spark.png';
import sparkMobile from '@/assets/images/spark-mob.png';
import gold from '@/assets/images/gold.png';
import goldTop from '@/assets/images/gold-blue.png';
import goldTopMobile from '@/assets/images/gold-mob.png';

const Hero: React.FC = () => {
  return (
    <section className="hero-section text-white lg:ml-auto pt-[20px] lg:pt-0">
      <div className="hero-container">
        <div className="gold-top">
          <picture>
            <source media="(max-width: 1023px)" srcSet={goldTopMobile} />
            <source media="(min-width: 1024px)" srcSet={goldTop} />
            <img src={goldTop} loading="lazy" alt="gold" className="h-auto" />
          </picture>
        </div>
        <div className="hero-section-text text-center font-mts hero-frame relative p-[50px] pt-[30px] z-10">
          <div className="fire-border w-[93%] lg:w-[100%]">
            <img
              src={fireBorder}
              loading="lazy"
              alt="200 фриспинов за регистрацию"
              className="h-[91%] lg:h-[95%] w-[100%] lg:w-[106%] max-w-[100%] lg:max-w-[106%]"
            />
          </div>
          <div className="fire-border fire-border--reverse w-[93%] lg:w-[100%]">
            <img
              src={fireBorder}
              loading="lazy"
              alt="fire-border"
              className="h-[91%] lg:h-[95%] w-[100%] lg:w-[106%] max-w-[100%] lg:max-w-[106%]"
            />
          </div>
          <Rectangle />
          <div className=" absolute top-[0] left-[50%] translate-x-[-50%]">
            <h1 className="flex flex-col items-center">
              <span
                className="custom-text-shadow-lg hero-title  uppercase leading-[0.8]
             bg-text-gradient bg-clip-text text-transparent drop-shadow-customLarge
             text-stroke text-stroke-4 md:text-stroke-4 lg:text-stroke-8 text-stroke-black animate-scale-pulse"
              >
                200
              </span>
              <span className="text-[39.6px] uppercase lg:text-[77.49px] text-[#00BDFD] leading-[1] mt-[29px] lg:mt-[31px] ">
                фриспинов
              </span>
              <span
                className="text-[24.63px] uppercase lg:text-[48.19px] font-extrabold text-fill 
                     text-fill-white bg-clip-text drop-shadow-custom text-stroke text-stroke-2 text-stroke-black leading-[1] mt-[7px] lg:mt-[17px]"
              >
                за регистрацию
              </span>
            </h1>
          </div>
        </div>
        <div className="character">
          <picture className="object-contain lg:h-full">
            <source media="(max-width: 767px)" srcSet={characterMobile} />
            <source media="(min-width: 768px)" srcSet={character} />
            <img
              src={character}
              loading="lazy"
              alt="character"
              className="object-contain lg:h-full"
            />
          </picture>
        </div>
        <div className="spark">
          <picture>
            <source media="(max-width: 767px)" srcSet={sparkMobile} />
            <source media="(min-width: 768px)" srcSet={spark} />
            <img src={spark} loading="lazy" alt="spark" className="h-auto" />
          </picture>
        </div>
        <div className="gold sm:block hidden">
          <img src={gold} loading="lazy" alt="gold" className="h-auto" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
