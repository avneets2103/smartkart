"use client"
import { setCurrentPage } from '@/RTK/features/sidebar';
import Sidebar from '@/my_components/Individual/sidebar/sidebar'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './page.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import MyCartMain from '@/my_components/myCartMain/myCartMain';
import axios from '@/utils/axios';
import { RENDER_BACKEND_URI } from '@/CONSTANTS';

function Page({ params }: any) {
    const dispatcher = useDispatch();
    const currentPage = params.pageName;
    useEffect(() => {
        try {
            // Verify access token
            const accessTokenResponse = axios.post(`${RENDER_BACKEND_URI}/users/verifyAccessToken`);
          } catch (error) {
          }
        dispatcher(setCurrentPage({currentPage: currentPage}));
    });

    return (
        <div className='w-full h-screen bg-bgColor flex'>
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
            <Sidebar/>
            <MyCartMain/>
        </div>
    )
}

export default Page
