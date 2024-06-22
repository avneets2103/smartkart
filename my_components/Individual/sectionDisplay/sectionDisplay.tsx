import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { sidebarMenu } from '@/CONSTANTS';

function SectionDisplay() {
    const currentPage = useSelector((state: any) => state.sidebar.currentPage);
    const [displayName, setDisplayName] = React.useState('');
    useEffect(() => {
        for(let i=0; i<sidebarMenu.length; i++){
            if(sidebarMenu[i].path === currentPage){
                setDisplayName(sidebarMenu[i].name);
                break;
            }
        }
    }, [currentPage]);

    return (
        <div className='flex flex-col h-[7%]'>
            <p className='text-[10px] text-textColorLight'>Home</p>
            <p className='text-2xl font-medium'>{displayName}</p>
        </div>
    )
}

export default SectionDisplay
