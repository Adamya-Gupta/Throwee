"use client"
import React, { useEffect, useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import axios from 'axios'
import Prompt from '@/app/_data/Prompt'
import { Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'

function LogoIdea({ formData, onHandleInputChange }) {

  const [ideas, setIdeas] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(formData?.idea);
  // useEffect(()=>{
  //   generateLogoDesignIdea();
  // },[])

  // const generateLogoDesignIdea=async()=>{

  //   setLoading(true)
  //   const PROMPT=Prompt.DESIGN_IDEA_PROMPT
  //   .replace(`{logoType}`,formData?.design.title)
  //   .replace(`{logoTitle}`,formData?.title)
  //   .replace(`{logoDesc}`,formData.desc)
  //   .replace(`{logoPrompt}`,formData.design.prompt)

  //   // console.log(PROMPT);
  //   console.log("Prompt sent to API:", PROMPT);

  //   const result = await axios.post('/api/ai-design-ideas',{
  //   prompt:PROMPT
  //   })

  //   console.log(result.data)

  //  !ideas&&setIdeas(result.data.logo_ideas);

  //   setLoading(false);
  // }

  useEffect(() => {
    const cachedIdeas = localStorage.getItem("logo_ideas");
    if (cachedIdeas) {
      setIdeas(JSON.parse(cachedIdeas));
    } else {
      generateLogoDesignIdea();
    }
  }, []);

  const generateLogoDesignIdea = async () => {
    try {
      setLoading(true);

      const PROMPT = Prompt.DESIGN_IDEA_PROMPT
        .replace(`{logoType}`, formData?.design.title)
        .replace(`{logoTitle}`, formData?.title)
        .replace(`{logoDesc}`, formData?.desc)
        .replace(`{logoPrompt}`, formData?.design.prompt);

      console.log("Prompt sent to API:", PROMPT);

      const result = await axios.post("/api/ai-design-ideas", {
        prompt: PROMPT,
      });

      const ideasFromAPI = result.data.logo_ideas;

      if (ideasFromAPI?.length) {
        setIdeas(ideasFromAPI);
        localStorage.setItem("logo_ideas", JSON.stringify(ideasFromAPI));
      } else {
        console.warn("No ideas returned from API.");
      }
    } catch (error) {
      console.error("Error fetching logo ideas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='my-10'>
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />
      <div className='flex items-center justify-center'>
        {loading && <Loader2Icon className='animate-spin my-10' />}
      </div>
      <div className='flex flex-wrap gap-3 mt-6'>
        {/* {ideas && ideas.map((item, index) => (
          <h2 key={index}
            onClick={() => {
              setSelectedOption(item);
              onHandleInputChange(item)
            }}
            className={`p-2 rounded-full border px-3 cursor-pointer
          hover:border-primary ${selectedOption == item && 'border-primary'}`}
          >{item}</h2>
        ))} */}

        {ideas && ideas.map((item, index) => {
  const ideaText = typeof item === 'string' ? item : item.idea; // safely extract the string
  return (
    <h2
      key={index}
      onClick={() => {
        setSelectedOption(ideaText);
        onHandleInputChange(ideaText);
      }}
      className={`p-2 rounded-full border px-3 cursor-pointer
        hover:border-primary ${selectedOption === ideaText ? 'border-primary' : ''}`}
    >
      {ideaText}
    </h2>
  );
})}

        <h2
          onClick={() => {
            setSelectedOption('Let AI Select the best idea');
            onHandleInputChange('Let AI Select the best idea')
          }}
          className={`p-2 rounded-full border px-3 cursor-pointer
          hover:border-primary ${selectedOption == 'Let AI Select the best idea' && 'border-primary'}`}>Let AI Select the best idea</h2>

        <Button 
          onClick={() => {
            localStorage.removeItem("logo_ideas");
            generateLogoDesignIdea();
          }}
          className="mt-4 px-4 py-2 bg-primary rounded-xl cursor-pointer"
        >
          Refresh Ideas
        </Button>
      </div>
    </div>

  )
}

export default LogoIdea

