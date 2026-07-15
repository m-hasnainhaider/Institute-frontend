'use client';
import styles from './Navbar.module.css'
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link'
import { GlobalContext } from '@/contextApi/rootContext';
import { CgProfile } from "react-icons/cg";
import API from '@/services/api';
import { useRouter } from 'next/navigation';
export default function Navbar() {
    let router = useRouter();
    let { user, setuser } = useContext(GlobalContext);
    let handlelogout = () => {
        API.get('/logout').then((res) => {
            if (res.status === 200) {
                if (res.data.success === true) {
                    router.push('/courses');
                    setuser(null);
                }
            }

        })
    }
    return (
        <>
            <div className={`${styles.navibar}  flex justify-between items-center px-20`}>
                <h1 className=' text-2xl font-bold text-[#003537] '>Institute</h1>

                <div className={`${styles.desktop_toolbar} flex justify-between items-center gap-6`}>
                    <ul className='font-medium'>
                        <Link href="/"><li>Home</li></Link>
                        <Link href="/courses"><li>Courses</li></Link>
                        <li>About</li>
                        <li>Blog</li>
                    </ul>
                    {
                        user ?
                            (
                                <div className='flex justify-center items-center'>
                                    {
                                        (user.role === 'student') ?
                                            (
                                                <Link href="/student-dashboard">
                                                    <button className='bg-[#003537] px-2 py-1 rounded-lg text-white '>
                                                        <i className='text-[25px]'><CgProfile /></i>
                                                    </button>
                                                </Link>
                                            )
                                            :
                                            (
                                                <Link href="/admin-dashboard">
                                                    <button className='bg-[#003537] px-2 py-1 rounded-lg text-white '>
                                                        <i className='text-[25px]'><CgProfile /></i>
                                                    </button>
                                                </Link>
                                            )
                                    }

                                    <button className='bg-[#003537] ml-1 px-2 py-1 rounded-lg text-white ' onClick={handlelogout}>
                                        Logout
                                    </button>
                                </div>


                            )
                            :
                            (
                                <Link href="/login">
                                    <button className='bg-[#003537] px-4 py-1 rounded-lg text-white '>
                                        Login
                                    </button>
                                </Link>
                            )
                    }
                </div>


            </div>
            <div className='h-20'>
                {/* this is used to give gap on the top of all the pages because the actual navbar is positioned fixed */}
            </div>
        </>
    )
}