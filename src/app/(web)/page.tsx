import Banner from "@/components/Home/Banner/Banner";
import Events from "@/components/Home/Events/Events";
import Explore from "@/components/Home/Explore/Explore";
import GetSkills from "@/components/Home/GetSkills/GetSkills";
import HelpSection from "@/components/Home/HelpSection/HelpSection";
import MobileApp from "@/components/Home/MobileApp/MobileApp";
import Subscribe from "@/components/Home/Subscribe/Subscribe";
import VideoTutorials from "@/components/Home/VideoTutorials/VideoTutorials";
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

      <div className="container mx-auto my-5 md:my-10">
        <HelpSection />
      </div>

      <div className="container mx-auto my-5 md:my-10">
        <VideoTutorials />
      </div>

      <div className="bg-primary">
        <MobileApp />
      </div>

    </div>
  );
}

export default HomePage;
