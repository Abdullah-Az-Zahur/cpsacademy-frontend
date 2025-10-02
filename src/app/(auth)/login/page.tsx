import React from "react";
import Link from "next/link";
import { X } from "lucide-react"; // using lucide-react icons
import LoginForm from "../_forms/LoginForm";

function Login() {
  return (
    <section className="w-full h-lvh bg-white p-6 flex justify-center items-center">
      <div className="relative max-w-2xl w-full flex flex-col items-center mx-auto rounded-3xl sm:p-6 p-4 bg-white border border-gray-200 shadow-xl">
        
        {/* Close Button - Top Right */}
        <Link
          href="/"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
        </Link>

        <h1 className="flex justify-center font-semibold text-4xl text-primary mb-6">
          Login
        </h1>
        <LoginForm />

        <p className="mt-6 text-sm text-gray-600">
          New here?{" "}
          <Link
            href="/signup"
            className="text-primary font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
