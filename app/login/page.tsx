import React from 'react'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import './page.css'
import LoginCard from '../my_components/loginCard/loginCard'
import DemoCard from '../my_components/loginCard/demoCard'

function Page() {
    return (
        <div>
            <div className='w-full h-screen z-0 absolute top-0 left-0'>
                <BackgroundGradientAnimation 
                gradientBackgroundStart="rgb(223,205,109)" 
                gradientBackgroundEnd="rgb(214,34,58)"
                firstColor="223,205,109" 
                secondColor='214,34,58'
                thirdColor='223,205,109'
                fourthColor='214,34,58'
                fifthColor='223,205,109'
                pointerColor='223,205,109'
                />
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
    )
}

export default Page
