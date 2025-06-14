"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import { ShimmerButton } from "@/components/magicui/shimmer-button";

function Info() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold sm:text-md md:text-xl lg:text-2xl xl:text-4xl text-primary'>Hello, {userDetail?.name}</h2>
                <div className='flex items-center gap-2'>
                    <Image src={'/coin.png'} alt='coin' width={40} height={40} className='w-5 lg:w-8 xl:10' />
                    <h2 className='font-bold sm:text-md md:text-xl lg:text-2xl xl:text-4xl'>{userDetail?.credits} Credit Left</h2>
                </div>
            </div>

            <div className='flex justify-between items-center mt-2'>
                <h2 className='font-medium'>Your Dashboard</h2>
                <Link href='/create'>
                    {/* <Button>+ Create New Logo</Button> */}
                    <ShimmerButton className="shadow-md">
                        <span className="whitespace-pre-wrap text-center text-xs  font-medium leading-none tracking-tight text-white  dark:from-white dark:to-slate-900/10 lg:text-md ">
                            + Create New Logo
                        </span>
                    </ShimmerButton>
                </Link>
            </div>
        </div>
    )
}

export default Info
