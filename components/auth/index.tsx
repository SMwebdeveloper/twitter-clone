"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useRegisterModal from "@/hooks/useRegisterModal";
import RegisterModal from "../modal/RegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import LoginModal from "../modal/LoginModal";
import { signIn } from "next-auth/react";
const Auth = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);
  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
        <Image
          src={"/images/x.svg"}
          alt="X"
          width={450}
          height={450}
          className="justify-self-center hidden md:block"
        />

        <div className="flex flex-col justify-center md:justify-between h-full md:h-[70vh]">
          <div className="block md:hidden">
            <Image src={"/images/x.svg"} alt="X" width={50} height={50} />
          </div>
          <h1 className="text-5xl font-bold mb-4">Happening now</h1>
          <div className="w-full md:w-[60%]">
            <h2 className="font-bold text-3xl mb-4">Join today.</h2>
            <div className="flex flex-col space-y-3">
              <Button
                onClick={() => signIn("google")}
                label={
                  <div className="flex items-center gap-2 justify-center">
                    <FcGoogle />
                    Sign up with google
                  </div>
                }
                fullWidth
                secondary
              />
              <Button
                onClick={() => signIn("github")}
                label={
                  <div className="flex items-center gap-2 justify-center">
                    <AiFillGithub />
                    Sign up with github
                  </div>
                }
                fullWidth
                secondary
              />
              <div className="flex items-center justify-center">
                <div className="h-px bg-gray-700 w-1/2" />
                <p className="mx-4">or</p>
                <div className="h-px bg-gray-700 w-1/2" />
              </div>
              <Button
                label={"Create account"}
                fullWidth
                onClick={onOpenRegisterModal}
              />
            </div>
          </div>
          <div className="w-full lg:w-[60%] mt-5">
            <h3 className="font-meium text-xl mb-4">Already have an account</h3>
            <Button
              label={"Signin"}
              fullWidth
              outline
              onClick={onOpenLoginModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
