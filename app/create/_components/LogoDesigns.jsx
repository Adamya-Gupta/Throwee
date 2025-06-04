"use client";
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import LogoDesig from '@/app/_data/LogoDesig'
import Image from 'next/image'

function LogoDesigns({onHandleInputChange,formData}) {
  const [selectedOption,setSelectedOption] = useState(formData?.design?.title);

  return (
    <div className='my-2'>
      <HeadingDescription 
      title={Lookup.LogoDesignTitle}
      description={Lookup.LogoDesignDesc}/>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-2 m-5'>
        {LogoDesig.map((design,index)=>(
          <div key={index} onClick={()=>{setSelectedOption(design.title);
            onHandleInputChange(design)
          }} 
          className={`p-1 hover:border-1 border-primary rounded-xl cursor-pointer ${selectedOption==design.title&&'border-1 rounded-xl border-primary'}`}>
            <Image src={design.image} alt={design.title} width={300} height={200} 
            className='w-full rounded-xl h-[150px] object-cover'/>
            <div className='flex items-center justify-center font-medium'> {design.title} </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default LogoDesigns
