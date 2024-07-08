"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { validateEmail } from "@/Helpers/login";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Link from 'next/link';
import { Toast, ToastErrors, ToastInfo } from "@/Helpers/toastError";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WAITLIST_URI } from "@/CONSTANTS";
import axios, { AxiosError } from "axios";
import { LinkPreview } from "@/components/ui/link-preview";

export default function Notifications() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState<string>("");
  // useEffects
  const isInvalid:boolean = React.useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);
  const addToWaitlist = async () => {
    try {
      const res = await axios.post(`${WAITLIST_URI}/waitlist/addToWaitlist`, {
        email: email,
      });
      Toast("❤️ Yay! We love you");
      setEmail("");
    } catch (error:AxiosError | any) {
      console.log(error);
      if(error.response.data.message === "User already exists in waitlist" ){
        Toast("🎊 You are already in the waitlist");
      }else{
        ToastErrors("Something went wrong");
      }
  }
}
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      <div className="h-[100vh] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-2 items-center">
                <img src="./icons/logo.png" alt="logo" className= ' mt-1 h-[3rem]'/>
                <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                    SmartKart
                </h1>
            </div>
          </div>
          <p></p>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            A single app to compare all your favourite products from all your favourite sites at one location, use all the filters and mathematical tools to get the best out of all products for yourself. Why not also have shopping history, product price tracking and budgeting at one single spot. You got it!
          </p>
          <div className="flex gap-2 mt-4">
            <Input 
              className='w-full z-10 relative h-[4rem]'
              value={email}
              isInvalid={isInvalid}
              color={isInvalid ? "danger" : "default"}
              errorMessage="Please enter a valid email"
              onValueChange={setEmail}
              isClearable
              isRequired
              size='sm' 
              radius='lg'
              type="email" 
              label="Email"
              labelPlacement="inside"
              />
            <Button 
            className="h-[3rem] z-10 relative"
            radius="sm"
            color="danger"
            onClick={addToWaitlist}
            >
              Add me to waitlist
            </Button>
          </div>
          <div className="flex justify-end text-center items-center text-sm text-neutral-500 mt-[-10px] z-10 relative">
            <p className="cursor-pointer" onClick={()=>{
              onOpen();
            }}>What am I signing up for?</p>
          </div>
        </div>
        <BackgroundBeams />
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          backdrop="blur"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col items-center justify-center gap-1 font-medium">
                  What are you signing up for?
                </ModalHeader>
                <ModalBody>
                    <>
                      The app is currently in making, so you can sign up for the waitlist. You will be the first ones to have full access to the application, and also review it to give us your recommendations too. 
                      We will be sending you a mail when the app is ready, containing the link to the app, and your password to access all the features.
                      You can refer to this Demo video to see the app in action for now.
                      <LinkPreview
                        url="https://www.youtube.com/watch?v=0VKE8xLhPmk"
                        className="font-medium bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
                      >
                        Demo Video here
                      </LinkPreview>
                    </>
                </ModalBody>
                <ModalFooter>
                    <>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress = {()=>{onClose()}}
                      >
                        Cool!
                      </Button>
                    </>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
