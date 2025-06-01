"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext'
import Prompt from '../_data/Prompt';
import axios from 'axios';

function GenerateLogo() {
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const[formData,setFormData]=useState();
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

  const GenerateAILogo= async ()=>{
    const PROMPT=Prompt.LOGO_PROMPT
    .replace(`{logoTitle}`,formData?.title)
    .replace(`{logoDesc}`,formData?.desc)
    .replace(`{logoColor}`,formData?.palette)
    .replace(`{logoDesign}`,formData?.design.title)
    .replace(`{logoIdea}`,formData?.idea)
    .replace(`{logoPrompt}`,formData?.design.prompt);

    console.log("Prompt sent to API = ", PROMPT);

    //Generate Logo Prompt from AI

    const result = await axios.post('/api/ai-logo-model',{prompt:PROMPT});

    console.log("the data is",result?.data)
    
    console.log("Response from hugging api = ",result)

    //Generate Logo Image
  }

  return (
    <div>
      hi
    </div>
  )
}

export default GenerateLogo
