"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  const {user}=useUser()
  return (
    <div className='px-5 lg:px-5 xl:px-5 2xl:px-5 p-4 flex justify-between items-center shadow-sm'>
      <Image src={'/logo.svg'} alt='logo' width={60} height={100}/>
      <div className='flex flex-row items-center gap-3'>
      {user?<Button >Dashboard</Button> :
      <Button>Get Started</Button>}
      <UserButton/>
      </div>
    </div>
  )
}

export default Header
