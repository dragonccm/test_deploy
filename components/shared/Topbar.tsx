"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
const Navbar = () => {
    const { data: session }: any = useSession();
    return (
        <nav className='topbar'>
            <Link href='/' className='flex items-center gap-4'>
                <Image src='/logo.svg' alt='logo' width={28} height={28} />
                <p className='text-heading3-bold text-light-1 max-xs:hidden'>WTF SOCIAL</p>
            </Link>

            <div className='flex items-center gap-1'>
                <div className='block md:hidden'>

                </div>


            </div>
        </nav>
    );
};

export default Navbar;