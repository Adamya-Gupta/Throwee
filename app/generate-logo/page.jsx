"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext'
import Prompt from '../_data/Prompt';
import axios from 'axios';
import Image from 'next/image';

function GenerateLogo() {
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const[formData,setFormData]=useState();
  const[loading,setLoading]=useState(false);
  const[logoImage,setLogoImage]=useState();

  useEffect(()=>{
    if(typeof window !=undefined && userDetail?.email){
      const storage = localStorage.getItem('formData')
      if(storage){
        setFormData(JSON.parse(storage));
        console.log(JSON.parse(storage))
      }
    }
  },[userDetail])
  // console.log(userDetail)

  useEffect(()=>{
    if(formData?.title){
      GenerateAILogo();
    }
  },[formData])

  //Generate Logo Prompt from AI
  const GenerateAILogo= async ()=>{
    setLoading(true);
    const PROMPT=Prompt.LOGO_PROMPT
    .replace(`{logoTitle}`,formData?.title)
    .replace(`{logoDesc}`,formData?.desc)
    .replace(`{logoColor}`,formData?.palette)
    .replace(`{logoDesign}`,formData?.design.title)
    .replace(`{logoIdea}`,formData?.idea)
    .replace(`{logoPrompt}`,formData?.design.prompt);

    console.log("Prompt sent to API for LogoGen = ", PROMPT);



    const result = await axios.post('/api/ai-logo-model',{
      prompt:PROMPT,
      email:userDetail?.email,
      title:formData.title,
      desc:formData.desc
    });

    console.log("the data is",result?.data)
    
    //Generate Logo Image
    console.log("Response from hugging api = ",result?.data?.data?.[0]?.b64_json)

    setLogoImage(result.data?.image);

    setLoading(false);

  }

  return (
    <div>
      <h2>{loading&&'loading...'}</h2>
      {!loading&&<Image src={logoImage} alt='logo' width={200} height={200}/>}
    </div>
  )
}

export default GenerateLogo
