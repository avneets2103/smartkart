import React from 'react'
import CartTop from '../cartTop/cartTop'

interface Props {}

function MyCartMain(props: Props) {
    const {} = props

    return (
        <div className='flex-grow flex flex-col width-[100%] h-[100%]'>
            <CartTop/>
        </div>
    )
}

export default MyCartMain
