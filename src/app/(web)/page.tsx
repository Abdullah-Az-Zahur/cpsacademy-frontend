import Banner from "@/components/Home/Banner/Banner";
import Explore from "@/components/Home/Explore/Explore";
import WhyChooseUs from "@/components/Home/WhyChooseUs/WhyChooseUs";
import React from "react";

function HomePage() {
  return (
    <div>
      <div className="container mx-auto">
        <Banner />
      </div>
      <div>
        <hr className="my-5" />
      </div>

      <div className="container mx-auto md:my-10">
        <WhyChooseUs />
      </div>

      <div className="bg-primary">
        <Explore />
      </div>


    </div>
  );
}

export default HomePage;
