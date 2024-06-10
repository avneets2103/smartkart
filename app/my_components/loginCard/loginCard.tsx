"use client";
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Input } from "@nextui-org/react";
import { minPassLength, otpGap, otpLength } from '@/app/CONSTANTS';
import { handleLogin, loginWithGoogle, passIsValid, validateEmail, handleReset, handleVerify } from '@/app/Helpers/login';
import OtpInput from "react-otp-input";
import Link from 'next/link';
import Cookies from "js-cookie";

function LoginCard() {
    // required variables and states
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passValid, setPassValid] = useState(true);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [otpPage, setOtpPage] = useState(false);
    const [OTP, setOTP] = useState("");
    const [time, setTime] = useState(otpGap);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const formattedTime = `${String(Math.floor(time / 60)).padStart(2,"0")}:${String(time % 60).padStart(2, "0")}`; 

    // useEffects
    const isInvalid:boolean = React.useMemo(() => {
        if (email === "") return false;
        return validateEmail(email) ? false : true;
    }, [email]);
    useEffect(() => {
        setPassValid(passIsValid(password));
      }, [email, password]);
    useEffect(() => {
        if (OTP.length == otpLength) {
          handleVerify(OTP);
        }
      }, [OTP]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (time > 0) {
            setTime(time - 1);
            } else {
            clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [time]);  

    // event handling functions
    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter' && passwordInputRef.current) {
            passwordInputRef.current.focus();
        }
    };
    const handlePasswordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleLogin(isInvalid, password, email, setOtpPage); 
          Cookies.set("email", email, {
            expires: 1,
          });
          setTime(otpGap); 
          setOTP("");
        }
    };
    
    // returning component based on OTP status
    if(!otpPage){
        return (
            <>
            <div className='
            min-w-60
            bg-bgColor 
            w-[30%] 
            h-2/3 
            rounded-[20px]
            flex
            flex-col
            items-center
            justify-evenly
            p-[0.75rem]
            georama-r
            '>
                <img src="./icons/logo.png" alt="logo"
                className='w-[50px]' 
                />
                <div className='flex flex-col items-center justify-center'>
                    <p className='georama-b text-xl'>Hey</p>
                    <p className='georama-l text-xs'>Pls Sign Up or Login</p>
                </div>
                <div className='w-full'>
                    <Input 
                    className='w-full'
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
                    variant='bordered' 
                    label="Email"
                    labelPlacement="inside"
                    onKeyPress={handleKeyPress}
                    />
                    <Input 
                    isInvalid={!passValid}
                    color={!passValid ? "danger" : "default"}
                    errorMessage={`Password must be at least ${minPassLength} characters long`}
                    ref={passwordInputRef}
                    value={password}
                    onValueChange={setPassword}
                    isRequired
                    size='sm' 
                    radius='lg'
                    variant='bordered' 
                    label="Password"
                    type={isVisible ? "text" : "password"}
                    labelPlacement="inside" 
                    onKeyPress={handlePasswordKeyPress}
                    />
                </div>
                <p>or</p>
                <div className='w-[40px] h-[40px] rounded-[10px] bg-color2 flex items-end justify-center' 
                onClick={loginWithGoogle}>
                    <img src="./icons/google.png" alt="google"
                    className='w-[30px]' 
                    />
                </div>
                <p className='text-xs text-textColorLight text-center'>By clicking continue, you agree to our 
                    <a href="" className='text-textColorDark'> Terms of Service </a>
                    and
                    <a href="" className='text-textColorDark'> Privacy Policy</a>
                </p>
            </div>
            </>
        );
    }else{
        return (
            <>
            <div className='
            relative
            min-w-60
            bg-bgColor 
            w-[30%] 
            h-1/2 
            rounded-[20px]
            flex
            flex-col
            items-center
            justify-evenly
            p-[0.75rem]
            georama-r
            '>
                <Link href="/login">
                    <img src="./icons/back.png" alt="back" 
                    className='w-[30px] absolute top-[1rem] left-[1rem]'
                    onClick={() => {setOtpPage(false)}}
                /> 
                    
                </Link>

                <img src="./icons/logo.png" alt="logo"
                className='w-[50px]' 
                />
                <div className='flex flex-col items-center justify-center'>
                    <p className='georama-b text-xl'>Hey</p>
                    <p className='georama-l text-xs'>Pls enter OTP sent on your email</p>
                </div>
                <div className='w-full'>
                <div className='otpArea flex items-center justify-center'>
                    <OtpInput
                        value={OTP}
                        onChange={(otp) => {
                            if (/^\d+$/.test(otp) && otp.length <= otpLength) {
                            setOTP(otp);
                            }
                        }}
                        numInputs={otpLength}
                        renderSeparator={<span> </span>}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
                </div>
                <div className="w-[100%] flex justify-end gap-[1rem]">
                    <p className = "text-[13px]">
                    {time > 0 ? formattedTime : ""}
                    </p>
                    <Link
                    href="/login"
                    onClick={()=>{handleReset(otpGap, time, setTime, setOTP)}}
                    className={time > 0 ? "text-[13px] text-textColorLight decoration-solid cursor-not-allowed " : "text-[13px] text-black decoration-solid "}
                    >
                    Resend OTP
                    </Link>
                </div>
                <p className='text-xs text-textColorLight text-center'>By clicking continue, you agree to our 
                    <a href="" className='text-textColorDark'> Terms of Service </a>
                    and
                    <a href="" className='text-textColorDark'> Privacy Policy</a>
                </p>   
            </div>
            </>
        )
    }
}

export default LoginCard;
