"use client"
import { Button } from '@/components/ui/button'
import { SignedOut, SignIn, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  const { user } = useUser()
  return (
    <div className='px-5 lg:px-5 xl:px-5 2xl:px-5 p-3 flex justify-between items-center shadow-sm'>
      <div className='flex text-2xl gap-1 font-medium items-center'>
      <Image src={'/logo.svg'} alt='logo' width={50} height={100} />
      Throwee
      </div>
      <div className='flex flex-row items-center gap-4'>
        {user ?
          <div className='flex flex-row gap-3'>
            <Link href='/dashboard'>
              <Button className='cursor-pointer'>Dashboard</Button>
            </Link>
              <UserButton/>
          </div> :
          <div className='flex flex-row gap-2 justify-between bg-primary text-primary-foreground rounded-xl p-2.5 hover:scale-105 transition-all cursor-pointer'>
            
            <SignedOut>
              <SignInButton className='cursor-pointer'/>
            </SignedOut>
           
            
          </div>
        }
      </div>
    </div>
  )
}

export default Header
