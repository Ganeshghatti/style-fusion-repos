import React from "react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="h-screen w-screen md:h-auto flex md:flex-col justify-center items-center bg-bgblue"
    >
      <div className="custom-width-55 md:w-full flex items-center justify-center">
        <div className="w-11/12 flex items-center justify-center flex-col gap-8 mt-32">
          <h1 className="text-6xl md:text-5xl text-black font-medium">
            <span className="text-8xl md:text-6xl font-extrabold my-2">
              COURIER <span className="text-darkblue">BAGS</span>
            </span>
            <br />
            CUSTOM PRINTING FROM
          </h1>
          <button className="button-filled text-5xl py-5 px-20 rounded-3xl">Rs.490</button>
        </div>
      </div>
      <div className="flex custom-width-45 md:w-full items-center justify-center">
        <img src="./assets/Home/Hero.png" className="w-full" />
      </div>
    </section>
  );
}
