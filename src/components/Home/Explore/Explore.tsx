import React from "react";

const Explore = () => {
  return (
    <div className="container mx-auto text-white px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
        {/* Left Section */}
        <div className="lg:w-1/2">
          <h3 className="mb-4 text-lg sm:text-xl font-semibold text-gray-300">
            EXPLORE
          </h3>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo,
            reiciendis?
          </p>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2">
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 md:mb-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga velit
            dolorum sapiente accusantium obcaecati quod alias facilis natus ad?
            Quos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-6">
            <div className="text-center sm:text-left">
              <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-500">
                90%
              </p>
              <p className="mt-3 sm:mt-4 font-bold text-sm sm:text-base md:text-lg">
                SATISFACTION
              </p>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-500">
                300k+
              </p>
              <p className="mt-3 sm:mt-4 font-bold text-sm sm:text-base md:text-lg">
                TEACHING HOURS
              </p>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-500">
                8.5M+
              </p>
              <p className="mt-3 sm:mt-4 font-bold text-sm sm:text-base md:text-lg">
                STUDENTS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
