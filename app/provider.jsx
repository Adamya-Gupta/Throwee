"use client"
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { UserDetailContext } from './_context/UserDetailContext';

function Provider({ children }) {

    const {user}=useUser();
    const [userDetail,setUserDetail]=useState();

    useEffect(() => {
        user&&CheckUserAuth();
    }, [user]);

    //Save user data
    const CheckUserAuth=async()=>{
    //Save User to Database
    const result = await axios.post('/api/users',{
        userName:user?.fullName,
        userEmail:user?.primaryEmailAddress?.emailAddress
    });
    console.log(result.data);
    setUserDetail(result.data);
    }

    return (
        <div>
            <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
            <Header />
            <div className='px-5 lg:px-5 xl:px-5 2xl:px-5'>
                {children}
            </div>
            </UserDetailContext.Provider>
        </div>
    )
}

export default Provider
