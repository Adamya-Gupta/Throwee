import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='px-5 lg:px-5 xl:px-5 2xl:px-5 p-4 flex justify-between items-center shadow-sm'>
      <Image src={'/logo.svg'} alt='logo' width={60} height={100}/>
      <Button>Get Started</Button>
    </div>
  )
}

export default Header
