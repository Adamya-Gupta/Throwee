"use client"
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";
import Prompt from "../_data/Prompt";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { BorderBeam } from "@/components/magicui/border-beam";

function GenerateLogo() {


  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


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
    <div className="flex justify-center items-start pt-20 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl p-6 relative">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold ">
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
              <div className="flex gap-4 mt-4 ">
                <Button onClick={downloadImage} className='cursor-pointer '>Download Logo</Button>
                <Link href="/create">
                  <Button variant="outline" className='cursor-pointer'>Create New</Button>
                </Link>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">No logo generated yet.</p>
          )}
        </CardContent>

        {mounted && theme === 'dark' ? (
          <BorderBeam duration={8} size={200} className="from-transparent via-green-500 to-transparent" />
        ) : (<BorderBeam duration={8} size={200} className="from-transparent via-black to-transparent " />)}

      </Card>
    </div>
  );
}

export default GenerateLogo;
