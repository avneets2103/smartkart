"use client"
import { setCurrentPage } from '@/RTK/features/sidebar';
import Sidebar from '@/my_components/Individual/sidebar/sidebar'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './page.css'

function Page({ params }: any) {
    const dispatcher = useDispatch();
    const currentPage = params.pageName;
    useEffect(() => {
        dispatcher(setCurrentPage({currentPage: currentPage}));
    });

    return (
        <div className='w-full h-screen bg-bgColor'>
        <Sidebar/>
        </div>
    )
}

export default Page
