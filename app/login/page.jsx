"use client"
import styles from './login.module.css';
import { FaArrowRight } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import API from '@/services/api';
import { useRouter } from 'next/navigation';
import { setAccessToken } from '@/services/api';
import { GlobalContext } from '@/contextApi/rootContext';


function Login() {
    let { setuser } = useContext(GlobalContext);
    const [form, setform] = useState({ email: "", pass: "" });
    let router = useRouter();
    const handlechange = (e) => {
        const { name, type, value, checked } = e.target;
        setform((pre) => ({ ...pre, [name]: type === 'checkbox' ? checked : value }));
    }

    const handlelogin = (e) => {
        e.preventDefault();
        API.post('/login', form)
            .then((res) => {
                if (res.status === 200 && res.data.success === true) {
                    setAccessToken(res.data.accessToken);
                    setuser(res.data.user);
                    router.push('/courses');
                }
            })
            .catch((err) => {
                console.error('Login error:', err);
                if (err.response) {
                    // server responded with an error status (401, 500, etc.)
                    alert(err.response.data.message || 'Login failed');
                } else {
                    // network error, no response received
                    alert('Something went wrong. Please try again.');
                }
            });
    };
    return (
        <>

            <div className='grid grid-cols-1 lg:grid-cols-2 px-3 sm:px-10 bg-[#ECEDEF] py-10'>
                <div className='bg-[#ffff] rounded-2xl lg:rounded-r-none lg:rounded-rb-none 
                flex justify-center items-center
                p-5'>
                    <div>
                        <h6 className='text-[#004F53] font-bold text-sm'>
                            Secure Access Gateway
                        </h6>
                        <h1 className='text-[#004F53] font-bold text-4xl'>Welcome Back</h1>
                        <p className='text-[#40484C]'>Enter your credentials to access the Digital Architecture suite.</p>
                        <form className='py-5' onSubmit={handlelogin}>
                            <label className='text-[#004F53] font-bold text-sm'>Email Address</label><br />
                            <input type='text'
                                name='email'
                                className='bg-[#E7E8EA] h-10 w-full rounded-lg'
                                required
                                onChange={handlechange}
                            /><br />
                            <label className='text-[#004F53] font-bold text-sm'>Password</label><br />
                            <input type='password'
                                name='pass'
                                className='bg-[#E7E8EA] h-10 w-full rounded-lg'
                                onChange={handlechange}
                                required
                            /><br />
                            <button className='mt-3 bg-[#004F53] text-white px-4 py-2
                             rounded cursor-pointer  flex justify-center items-center
                             hover:bg-[#003D40]'>Login<FaArrowRight className='mx-2' /></button>
                        </form>
                        <div className='text-center '>
                            <Link href='/signup'><p className='cursor-pointer'>Don&apos;t have an account ?</p></Link>
                        </div>
                    </div>
                </div>
                <div className={`${styles.login_background} rounded-r-2xl rounded-rb-2xl overflow-hidden hidden lg:block`}>

                    <div className='bg-[#004a63e3] w-full h-full flex justify-center items-center'>
                        <div className='bg-[#003243] w-100  rounded-2xl p-9'>
                            <div className='flex my-1'>
                                {
                                    [...Array(5)].map((_, index) => (
                                        <i className='text-[#6BF6FF] px-0.5' key={index}><IoIosStar /></i>
                                    ))
                                }
                            </div>
                            <h1 className='text-[20px] text-white'>&quot;The standard of technical education at this institute is unparalleled. It truly empowers the digital architects of tomorrow.&quot;</h1>
                            <div className='flex items-center mt-2'>
                                <div className='w-12.5 h-12.5 border-2 border-[#6BF6FF] mr-3 rounded-lg overflow-hidden'>
                                    <Image
                                        src="/login/admin.jpg"
                                        alt="CEO Image"
                                        width={50}
                                        height={50}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className='text-white text-sm'>Marcus V. Chen</h4>
                                    <p className='text-white text-sm'>Principal Architect at NEXUS Global</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login