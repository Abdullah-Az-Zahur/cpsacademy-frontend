import React from "react";
import Link from "next/link";
import { X } from "lucide-react"; // same icon lib
import SignupForm from "../_forms/SignupForm";

function SignUp() {
  return (
    <section className="w-full min-h-lvh bg-white p-6 flex justify-center items-center">
      <div className="relative max-w-2xl w-full flex flex-col items-center mx-auto rounded-3xl bg-white border border-gray-200 shadow-md sm:p-6 p-4">
        
        {/* Close Button - Top Right */}
        <Link
          href="/"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
        </Link>

        <SignupForm />

        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUp;
