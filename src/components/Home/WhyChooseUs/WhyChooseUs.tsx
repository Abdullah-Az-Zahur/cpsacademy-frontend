import Link from "next/link";
import React from "react";
import WhyChooseCard from "./Card/WhyChooseCard";

const WhyChooseUs = () => {
  return (
    <div className="w-full overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row gap-8 md:gap-10 py-8 md:py-10 lg:py-16">
        <div className="flex-1">
          <h3 className="text-primary font-bold text-lg sm:text-xl md:text-2xl">
            WHY CHOOSE US
          </h3>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 md:mt-4">
            Learn the Skills you <br className="hidden sm:block" /> Need to
            Succeed
          </p>
        </div>
        <div className="md:w-1/2">
          <p className="text-gray-600 text-base sm:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            expedita aspernatur natus dignissimos, quisquam odit laborum earum
            laudantium saepe dolorem omnis repudiandae quasi velit repellendus
            nihil error exercitationem aperiam ex deserunt magnam modi esse
            maiores enim nobis. Dolores odio eius, magni
          </p>

          <div className="mt-6 md:mt-8 lg:mt-10">
            <button
              
              className="underline text-primary font-bold text-lg hover:text-primary-dark transition-colors"
            >
              Learn more about us
            </button>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <WhyChooseCard
              bgColor="bg-gradient-to-br from-blue-500 to-blue-700"
              title="Fast Delivery"
              description="We deliver projects faster than anyone in the industry with our optimized workflow."
              icon="rocket"
              delay={0.1}
            />

            <WhyChooseCard
              bgColor="bg-gradient-to-br from-purple-500 to-purple-700"
              title="Comprehensive Learning"
              description="Access extensive resources and learning materials to enhance your knowledge."
              icon="book"
              delay={0.2}
            />

            <WhyChooseCard
              bgColor="bg-gradient-to-br from-amber-500 to-amber-700"
              title="Award Winning"
              description="Recognized industry-wide for our excellence and innovative solutions."
              icon="award"
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
