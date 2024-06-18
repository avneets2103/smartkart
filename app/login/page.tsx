"use client"
import React from 'react'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import './page.css'
import LoginCard from '@/my_components/loginCard/loginCard'
import DemoCard from '@/my_components/loginCard/demoCard'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import axios from '@/utils/axios'
import {useEffect} from 'react'
import { BACKEND_URI } from '@/CONSTANTS'
import Cookies from "js-cookie";
import { tokenCookies } from '@/Helpers/cookieHandling'

function Page() {
    const Router = useRouter();
    const { theme, setTheme } = useTheme();
    useEffect(()=>{
        const checkTokens = async ()=>{
            try {
              // Verify access token
              const accessTokenResponse = await axios.post(`${BACKEND_URI}/users/verifyAccessToken`);
              if (accessTokenResponse.status === 200) {
                Router.push('/sections/myCart');
                return;
              }
            } catch (error) {
              console.log('Access token invalid, trying refresh token...');
            }
      
            try {
              // Refresh access token
              const refreshTokenResponse = await axios.post(`${BACKEND_URI}/users/refreshAccessToken`, {
                refreshToken: Cookies.get("refreshToken")
              });
              if (refreshTokenResponse.status === 200) {
                tokenCookies(refreshTokenResponse.data.data.accessToken, refreshTokenResponse.data.data.refreshToken);
                Router.push('/sections/myCart');
                return;
              }
            } catch (error) {
              console.log('Refresh token invalid.');
            }
          };
      
          checkTokens();
    }, [Router])

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
        theme="colored"
        />
        <div>
            <div className='w-full h-screen z-0 absolute top-0 left-0'>
                {theme === "dark" ? 
                <BackgroundGradientAnimation 
                gradientBackgroundStart="rgb(32,32,32)" 
                gradientBackgroundEnd="rgb(214,34,58)"
                firstColor="32,32,32" 
                secondColor='214,34,58'
                thirdColor='255,255,255'
                fourthColor='214,34,58'
                fifthColor='32,32,32'
                pointerColor='32,32,32'
                />
                :
                <BackgroundGradientAnimation 
                gradientBackgroundStart="rgb(223,205,109)" 
                gradientBackgroundEnd="rgb(214,34,58)"
                firstColor="223,205,109" 
                secondColor='214,34,58'
                thirdColor='223,205,109'
                fourthColor='214,34,58'
                fifthColor='223,205,109'
                pointerColor='223,205,109'
                />}                    
            </div>
            <div 
            className='
            w-full 
            h-screen 
            flex 
            justify-center 
            items-center 
            z-1 
            absolute 
            top-0 
            left-0
            '>
                <div 
                className="
                relative
                loginGlass
                z-0
                bg-color2
                w-10/12 h-5/6  
                rounded-[20px] 
                drop-shadow-ourDropShadow
                flex
                items-center
                justify-between
                px-[5rem]
                ">
                    <LoginCard />
                    <DemoCard/>
                    <img src="./icons/QuestionMark.png" alt="questionMark" className='m-[-1rem] min-w-40 w-[35%] hide-on-small'/>                </div> 
            </div>
        </div>
        </>
    )
}

export default Page
