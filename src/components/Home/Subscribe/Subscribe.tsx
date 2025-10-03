import { Check } from "lucide-react";
import React from "react";
import EmailSubscribe from "./EmailSubscribe/EmailSubscribe";

const Subscribe = () => {
  return (
    <div className="bg-blue-200 rounded-4xl md:flex mx-2">
      <div className="md:p-10 p-5 md:w-1/2">
        <h3 className="text-3xl font-bold mb-5 md:mb-10">
          Do You Want a Successful Life ?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="flex items-start gap-3">
            <Check className="bg-primary text-white rounded-full p-1 flex-shrink-0 w-6 h-6" />
            <p className="text-base">25,000 online courses</p>
          </div>
          <div className="flex items-start gap-3">
            <Check className="bg-primary text-white rounded-full p-1 flex-shrink-0 w-6 h-6" />
            <p className="text-base">Expert instruction</p>
          </div>
          <div className="flex items-start gap-3">
            <Check className="bg-primary text-white rounded-full p-1 flex-shrink-0 w-6 h-6" />
            <p className="text-base">Lifetime access</p>
          </div>
        </div>
      </div>

      <div className="my-auto md:flex-1 md:p-10 p-5">
        <EmailSubscribe />{" "}
      </div>
    </div>
  );
};

export default Subscribe;
