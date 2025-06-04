'use client';

import React, { useEffect, useState } from 'react';
import Lookup from '../_data/Lookup';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SignedOut, SignInButton, useUser } from '@clerk/nextjs';

function Hero() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const [logoTitle, setLogoTitle] = useState('');

  // Use effect to avoid hydration issues
  useEffect(() => {
    const title = searchParams?.get('title') ?? '';
    setLogoTitle(title);
  }, [searchParams]);

  return (
    <div className='flex items-center mt-32 flex-col gap-5'>
      <h2 className='text-cyan-900 text-3xl text-center md:text-4xl lg:text-5xl font-bold '>{Lookup.HeroHeading}</h2>
      <h2 className='text-3xl text-center font-bold md:text-4xl lg:text-5xl '>{Lookup.HeroSubHeading}</h2>
      <p className='text-lg text-gray-500 text-center'>{Lookup.HeroDesc}</p>

      <div className='flex gap-6 w-full max-w-2xl mt-10'>
        <input
          type='text'
          placeholder={Lookup.InputTitlePlaceholder}
          className='p-3 border rounded-md w-full shadow-md'
          value={logoTitle}
          onChange={(e) => setLogoTitle(e.target.value)}
        />
        {user ? (
          <Link href={`/create?title=${encodeURIComponent(logoTitle)}`}>
            <Button className='p-6 shadow-md'>Get Started</Button>
          </Link>
        ) : (
          <SignedOut>
            <SignInButton>
              <Button className='p-6 shadow-md'>Get Started</Button>
            </SignInButton>
          </SignedOut>
        )}

      </div>
    </div>
  );
}

export default Hero;
