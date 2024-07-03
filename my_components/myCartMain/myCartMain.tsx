import React from 'react'
import CartTop from '../cartTop/cartTop'
import CartHero from '../cartHero/cartHero'

interface Props {}

function MyCartMain(props: Props) {
    const {} = props

    return (
        <div className='flex-grow flex flex-col width-full h-full mr-6'>
            <CartTop/>
            <CartHero/>
        </div>
    )
}

export default MyCartMain
