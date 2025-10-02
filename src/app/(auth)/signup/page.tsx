import React from "react";
import SignupForm from "../_forms/SignupForm";

function SignUp() {
  return (
    <section className="w-full min-h-lvh bg-white p-6 flex justify-center items-center">
      <div className="max-w-2xl w-full flex flex-col items-center mx-auto rounded-3xl bg-white border border-gray-200 shadow-md">
        

        <div className="sm:p-6 p-4 w-full flex justify-center">
          <SignupForm/>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
