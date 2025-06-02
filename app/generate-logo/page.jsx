// "use client"
// import React, { useContext, useEffect, useState } from 'react'
// import { UserDetailContext } from '../_context/UserDetailContext'
// import Prompt from '../_data/Prompt';
// import axios from 'axios';
// import Image from 'next/image';

// function GenerateLogo() {
//   const {userDetail,setUserDetail}=useContext(UserDetailContext);
//   const[formData,setFormData]=useState();
//   const[loading,setLoading]=useState(false);
//   const[logoImage,setLogoImage]=useState();

//   useEffect(()=>{
//     if(typeof window !=undefined && userDetail?.email){
//       const storage = localStorage.getItem('formData')
//       if(storage){
//         setFormData(JSON.parse(storage));
//         console.log(JSON.parse(storage))
//       }
//     }
//   },[userDetail])
//   // console.log(userDetail)

//   useEffect(()=>{
//     if(formData?.title){
//       GenerateAILogo();
//     }
//   },[formData])

//   //Generate Logo Prompt from AI
//   const GenerateAILogo= async ()=>{
//     setLoading(true);
//     const PROMPT=Prompt.LOGO_PROMPT
//     .replace(`{logoTitle}`,formData?.title)
//     .replace(`{logoDesc}`,formData?.desc)
//     .replace(`{logoColor}`,formData?.palette)
//     .replace(`{logoDesign}`,formData?.design.title)
//     .replace(`{logoIdea}`,formData?.idea)
//     .replace(`{logoPrompt}`,formData?.design.prompt);

//     console.log("Prompt sent to API for LogoGen = ", PROMPT);



//     const result = await axios.post('/api/ai-logo-model',{
//       prompt:PROMPT,
//       email:userDetail?.email,
//       title:formData.title,
//       desc:formData.desc
//     });

//     console.log("the data is",result?.data)
    
//     //Generate Logo Image
//     console.log("Response from hugging api = ",result?.data?.data?.[0]?.b64_json)

//     setLogoImage(result.data?.image);

//     setLoading(false);

//   }

//   return (
//     <div>
//       <h2>{loading&&'loading...'}</h2>
//       {!loading&&<Image src={logoImage} alt='logo' width={200} height={200}/>}
//     </div>
//   )
// }

// export default GenerateLogo
"use client"
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function GenerateLogo() {
  const { userDetail } = useContext(UserDetailContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState();

  useEffect(() => {
    if (typeof window !== "undefined" && userDetail?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
      }
    }
  }, [userDetail]);

  useEffect(() => {
    if (formData?.title) {
      GenerateAILogo();
    }
  }, [formData]);

  const GenerateAILogo = async () => {
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT
      .replace(`{logoTitle}`, formData?.title)
      .replace(`{logoDesc}`, formData?.desc)
      .replace(`{logoColor}`, formData?.palette)
      .replace(`{logoDesign}`, formData?.design.title)
      .replace(`{logoIdea}`, formData?.idea)
      .replace(`{logoPrompt}`, formData?.design.prompt);

    const result = await axios.post("/api/ai-logo-model", {
      prompt: PROMPT,
      email: userDetail?.email,
      title: formData.title,
      desc: formData.desc,
    });

    setLogoImage(result.data?.image);
    setLoading(false);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = logoImage;
    link.download = "logo.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-center items-start pt-20 bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Your Generated Logo
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-4">
          {loading ? (
            <p className="text-muted-foreground">Generating logo, please wait...</p>
          ) : logoImage ? (
            <>
              <Image
                src={logoImage}
                alt="Generated Logo"
                width={300}
                height={300}
                className="rounded-lg border"
              />
              <div className="flex gap-4 mt-4">
                <Button onClick={downloadImage}>Download Logo</Button>
                <Link href="/create">
                  <Button variant="outline">Create New</Button>
                </Link>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">No logo generated yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default GenerateLogo;
