"use client";
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import { useSearchParams } from 'next/navigation'
import { Card ,CardContent, } from '@/components/ui/card';
import { BorderBeam } from "@/components/magicui/border-beam";


function LogoTitle({onHandleInputChange,formData}) {
    // const searchParam=useSearchParams();
    
    // const [title,setTitle]=useState(searchParam?.get('title')??'')

  return (
    <div className='my-10 relative'>
      
      <HeadingDescription 
      title={Lookup?.LogoTitle}
      description={Lookup.LogoTitleDesc}/>

      <input type="text" placeholder={Lookup.InputTitlePlaceholder} 
      className='p-4 border rounded-lg mt-5 w-full'
        defaultValue={formData?.title}
        onChange={(e)=>onHandleInputChange(e.target.value)}
      />
     
    </div>
  )
}

export default LogoTitle
