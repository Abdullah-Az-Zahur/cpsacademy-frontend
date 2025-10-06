import React from "react";
import Image from "next/image";
import image1 from "../../../../public/images/home/Subtract.png";
import image2 from "../../../../public/images/home/Subtract-1.png";
import image3 from "../../../../public/images/home/Subtract-2.png";

const VideoTutorials = () => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mx-2">
      <div className="flex flex-col">
        <Image
          src={image1}
          alt="image 1"
          height={400}
          width={400}
          className="rounded-2xl"
        />
        <div className="mt-5 w-5/6">
          <p className="text-2xl font-bold">Effective leader</p>
          <p className="text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reiciendis, laudantium.
          </p>
        </div>
      </div>

      <div className="flex md:flex-col flex-col-reverse">
        <div className="mt-5 w-5/6">
          <p className="text-2xl font-bold">Video Tutorials</p>
          <p className="text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reiciendis, laudantium.
          </p>
        </div>

        <Image
          src={image2}
          alt="image 1"
          height={400}
          width={400}
          className="rounded-2xl"
        />
      </div>

      <div className="flex flex-col">
        <Image
          src={image3}
          alt="image 1"
          height={400}
          width={400}
          className="rounded-2xl"
        />
        <div className="mt-5 w-5/6">
          <p className="text-2xl font-bold">Exclusive Coach</p>
          <p className="text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reiciendis, laudantium.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoTutorials;
