import Banner from "@/components/Home/Banner/Banner";
import Events from "@/components/Home/Events/Events";
import Explore from "@/components/Home/Explore/Explore";
import GetSkills from "@/components/Home/GetSkills/GetSkills";
import Subscribe from "@/components/Home/Subscribe/Subscribe";
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

      <div className="container mx-auto md:my-10">
        <GetSkills />
      </div>

      <div className="container mx-auto md:my-10">
        <Events />
      </div>

      <div className="container mx-auto my-5 md:my-10">
        <Subscribe />
      </div>

    </div>
  );
}

export default HomePage;
