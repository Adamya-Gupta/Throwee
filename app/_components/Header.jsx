
'use client'

import { Button } from '@/components/ui/button';
import { SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Home, LayoutDashboard, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import ThemeToggle from './ThemeToggle';
import { useEffect, useState } from 'react';


function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDashboard = pathname === '/dashboard';
  const isHome = pathname === '/';

  return (
    <div className='px-5 py-3 flex justify-between items-center shadow-sm'>
      <div className='flex text-2xl gap-1 font-medium items-center'>
        {mounted && theme === 'light' ? (
          <Image src='/logo.svg' alt='logo' width={50} height={100} />
        ) : mounted ? (
          <Image src='/logo_dark.svg' alt='logo' width={50} height={100} />
        ) : (
          // Optional: render nothing or a placeholder to avoid mismatch
          <div style={{ width: 50, height: 100 }} />
        )}
        Throwee
      </div>

      <div className='flex flex-row items-center gap-2'>
        {!isHome && (
          <Link href="/">
            <Button variant="ghost">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
        )}

        {user && !isDashboard && (
          <Link href="/dashboard">
            <Button>
              <LayoutDashboard className="h-4 w-4" /> <div className='hidden sm:flex'>Dashboard</div>
            </Button>
          </Link>
        )}
        <ThemeToggle />

        {user ? (
          <UserButton />
        ) : (
          <div className="flex gap-2 bg-primary text-primary-foreground rounded-xl p-2.5 hover:scale-105 transition-all cursor-pointer">
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;


