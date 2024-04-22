
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const Navbar = async () => {
    const session = await getServerSession();

    if (!session) {
        redirect("/register");
    }

    return (
        <nav className='topbar'>
            <Link href='/' className='flex items-center gap-4'>
                <Image src='/logo.svg' alt='logo' width={28} height={28} />
                <p className='text-heading3-bold text-light-1 max-xs:hidden'>WTF SOCIAL</p>
            </Link>

            {!session ? (
                <Link href='/login' className='flex items-center gap-4'>
                    <p className='text-heading3-bold text-light-2 max-xs:hidden'>login</p>
                </Link>) : (
                <div className='flex items-center gap-1'>
                    <div className='block md:hidden'>
                    </div>
                    <h1 className="text-heading3-bold text-light-1 max-xs:hidden">
                        <Link href={'/profile/' + session.user?.name} className='flex items-center gap-4'>
                            <p className='text-heading3-bold text-light-1 max-xs:hidden'>{session.user?.name}</p>
                        </Link>
                    </h1>
                </div>
            )}
        </nav>
    );
};

export default Navbar;