import { Button } from '@nextui-org/react'
import React from 'react'

function DemoCard() {
    return (
        <div className='hide-on-mobile ml-12 gap-8 flex flex-col justify-between w-1/4'>
            <div>
                <div
                className='
                text-4xl
                text-textColorDark
                georama-b
                '
                >
                    <p>Changing</p> 
                    <p className='text-nowrap'>the way you</p> 
                    <p>shop!</p>
                </div>
                <p className='text-xs text-textColorDark'>We help you compare, track and make your shopping experience more fruitful</p>
            </div>
            <div>
                <p className='text-xs text-textColorDark'>Wanna know more?</p>
                <Button 
                color="default" 
                variant="bordered"
                radius="md"
                size="sm"
                >Read</Button> 
            </div>
        </div>
    )
}

export default DemoCard
