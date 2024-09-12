"use client";
import axios from "axios";
import Input from "@/components/input";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [varient, setVarient] = useState("login");

  const toggleVarient = useCallback(() => {
    setVarient((currentVarient) =>
      currentVarient === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    console.log("Email and password", email, password);
    try {
      const result = await signIn('credentials',{
        email, password,
        redirect: false,
        callbackUrl: '/'
      });
      
      if (result?.ok) {
        router.push('/');
      } 
    } catch (error) {
      console.log("error is ", error)
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      console.log("Api called");
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          {/* <img src="/images/logo_new.png" alt="logo" className="h-12" /> */}
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-sm w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {varient === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {varient === "register" && (
                <Input
                  label="name"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  type="text"
                  value={name}
                />
              )}
              {/* Test */}
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
            <button
              onClick={varient=== 'login'? login : register}
              className="bg-red-600 py-3 my-10 text-white rounded-md w-full hover:bg-red-700 transition"
            >
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
