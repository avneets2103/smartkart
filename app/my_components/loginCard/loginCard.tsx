"use client";
import React, { useState, useRef, KeyboardEvent } from 'react';
import { Input } from "@nextui-org/react";

function LoginCard() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const validateEmail = (value: string): boolean => 
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

    const isInvalid = React.useMemo(() => {
        if (email === "") return false;
        return validateEmail(email) ? false : true;
    }, [email]);

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter' && passwordInputRef.current) {
            passwordInputRef.current.focus();
        }
    };

    return (
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
                />
            </div>
            <p>or</p>
            <div className='w-[40px] h-[40px] rounded-[10px] bg-color2 flex items-end justify-center'>
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
    );
}

export default LoginCard;
