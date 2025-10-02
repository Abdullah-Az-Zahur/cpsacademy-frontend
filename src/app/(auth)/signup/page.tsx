import React from "react";
import SignupForm from "../_forms/SignupForm";

function SignUp() {
  return (
    <section className="w-full min-h-lvh bg-white p-6 flex justify-center items-center">
      <div className="max-w-2xl w-full flex flex-col items-center mx-auto rounded-3xl bg-white border border-gray-200 shadow-md">
        <div className="w-full flex flex-col gap-3 items-center my-6 border-b border-gray-400 pb-5">
          <h1 className="flex justify-center font-semibold text-4xl text-primary"></h1>
        </div>

        <div className="sm:p-6 p-4 w-full flex justify-center">
          <SignupForm/>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
