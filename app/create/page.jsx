"use client"

import React, { useEffect, useState } from 'react'
import LogoTitle from './_components/LogoTitle'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import LogoPalette from './_components/LogoPalette'
import LogoDesigns from './_components/LogoDesigns'
import LogoIdea from './_components/LogoIdea'
import LogoDesc from './_components/LogoDesc'
import PricingModel from './_components/PricingModel'
import { BorderBeam } from '@/components/magicui/border-beam'
import { useTheme } from 'next-themes'

function CreateLogo() {

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
      useEffect(() => setMounted(true), []);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState();

    const onHandleInputChange = (field, value) => {

        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    console.log(formData)

    return (
        <div className='mt-20 p-5 border rounded-xl 2xl:mx-72 relative space-y-2'>
           {step==1?
           <LogoTitle onHandleInputChange={(v) => onHandleInputChange('title', v)} formData={formData}/>:
           step==2?
           <LogoDesc onHandleInputChange={(v) => onHandleInputChange('desc', v)} formData={formData}/> :
           step==3?
           <LogoPalette onHandleInputChange={(v) => onHandleInputChange('palette', v)} formData={formData}/>:
           step==4?
           <LogoDesigns onHandleInputChange={(v) => onHandleInputChange('design', v)} formData={formData}/>:
           step==5?
           <LogoIdea onHandleInputChange={(v) => onHandleInputChange('idea', v)} formData={formData}/>:
            step==6?
           <PricingModel onHandleInputChange={(v) => onHandleInputChange('pricing', v)} formData={formData}/>:
           null
            }
                
      

            <div className='flex justify-between items-center mt-10'>
                {step != 1 && <Button variant="outline" onClick={()=>setStep(step-1)}> <ArrowLeft /> Previous</Button>}
                <Button onClick={()=>setStep(step+1)}> <ArrowRight /> Next</Button>

            </div>
            {mounted && theme === 'dark' ? (
            <BorderBeam duration={8} size={200} className="from-transparent via-green-500 to-transparent"/>
            ):(<BorderBeam duration={8} size={200} className="from-transparent via-black to-transparent "/>)}

        </div>
    )
}

export default CreateLogo
