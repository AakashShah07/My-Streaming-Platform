"use client";

import Input from "@/components/input";
import { useCallback, useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");

  const [varient, setVarient] = useState("login");

  const toggleVarient = useCallback(() => {
    setVarient((currentVarient) =>
      currentVarient === "login" ? "register" : "login"
    );
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo_new.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-sm w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {varient === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {varient === "register" && (
                <Input
                  label="UserName"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="userName"
                  type="text"
                  value={userName}
                />
              )}

              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button className="bg-red-600 py-3 my-10 text-white rounded-md w-full hover:bg-red-700 transition">
              {varient === "register" ? "Create a account" : "Login"}
            </button>

            <p className="text-neutral-500 mt-12">
              {varient === "register"
                ? "Already have an account? "
                : "New user ? "}
              <span
                onClick={toggleVarient}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {varient === "login" ? "Create a account" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
