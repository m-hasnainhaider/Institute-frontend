"use client"
import styles from './signup.module.css'
import { useContext, useState } from 'react'
import API from '../../services/api.js'
import { GlobalContext } from '@/contextApi/rootContext'
import { useRouter } from 'next/navigation'
import { setAccessToken } from '@/services/api'
function Signup() {
    let router=useRouter();
    let { setuser } = useContext(GlobalContext);
    const [formdata, setformdata] = useState({
        name: "", email: "",
        pass: "", confirmpass: "",
        country_code: "+92", subscriber_no: "",
        termcondition: false
    });

    const handlechange = (e) => {
        const { name, type, value, checked } = e.target;
        setformdata((pre) => ({ ...pre, [name]: type === 'checkbox' ? checked : value }));
    }

    const handlecreate = async (e) => {  // ← ADD 'async'
        e.preventDefault();
        if (formdata.termcondition === false) {
            alert("Please accept the term and condition");
            return;  
        }
        if (formdata.pass !== formdata.confirmpass) {  // ← Use !==
            alert("Password is not Same");
            return;  
        }

        try {
            
            const response = await API.post('/create-account', {  
                name: formdata.name,
                email: formdata.email,
                pass: formdata.pass,
                country_code: formdata.country_code,
                subscriber_no: formdata.subscriber_no
            });

           
            if (response.status === 201) {
                if (response.data.success === true) {
                    
                    setuser(response.data.user);
                    setAccessToken(response.data.accessToken);
                    router.push('/courses');
                } else {
                    
                    console.log('Account creation failed:', response.data.message);
                    alert(response.data.message || 'Account creation failed');
                }
            } else {
              
                console.log('Unexpected status:', response.status);
                alert('Something went wrong. Please try again.');
            }

        } catch (error) {
            
            console.error('Signup error:', error);
        }
    };
    return (
        <>
            <div className={`${styles.signup_hero}`}>
                <div className='w-full h-full bg-[#003537da] py-10'>
                    <div className='bg-[#D9E0E3] w-full max-w-lg mx-auto p-7 rounded-2xl'>
                        <h6 className='text-[#004B63] text-[12px] font-extrabold tracking-widest'>BASIC INFORMATION</h6>
                        <h1 className='text-[#003345] text-3xl font-bold'>Join the Architects of the Future</h1>
                        <form onSubmit={handlecreate}>
                            <div className='mt-5'>
                                <label className='text-[11px] font-bold text-[#777E83] '>FULL NAME</label><br />
                                <input type='text' placeholder='John Doe'
                                    onChange={handlechange} name='name' value={formdata.name}
                                    className='bg-[#F0F3F4] px-4 py-2 w-full'
                                    required
                                />
                            </div>
                            <div className='mt-4'>
                                <label className='text-[11px] font-bold text-[#777E83]'>EMAIL ADDRESS</label><br />
                                <input type='text' placeholder='Test@gmail.com'
                                    onChange={handlechange} name='email' value={formdata.email}
                                    className='bg-[#F0F3F4] px-4 py-2 w-full' required /><br />
                            </div>
                            <div className='mt-4'>
                                <label className='text-[11px] font-bold text-[#777E83]'>PHONE NUMBER</label><br />

                                <div className='grid grid-cols-12 gap-2'>
                                    <div className='col-span-3 sm:col-span-2'>
                                        <select className='
                                        bg-[#F0F3F4] px-2 py-2.5 w-full'
                                            name='country_code'
                                            onChange={handlechange}
                                            value={formdata.country_code}
                                        >
                                            <option value="+92">+92</option>
                                            <option value="+128">+128</option>
                                            <option value="+64">+64</option>
                                        </select>
                                    </div>
                                    <div className=' col-span-9 sm:col-span-10'>
                                        <input type='text'
                                            name='subscriber_no'
                                            onChange={handlechange}
                                            placeholder='333-444'
                                            maxLength={10}
                                            className='bg-[#F0F3F4] 
                                         px-4 py-2 w-full' required />
                                    </div>
                                </div>
                            </div>



                            <div className='grid sm:grid-cols-2 gap-2 mt-4'>
                                <div>
                                    <label className='text-[11px] font-bold text-[#777E83]'>PASSWORD</label><br />
                                    <input type='password'
                                        placeholder='*****'
                                        className='bg-[#F0F3F4] px-4 py-2 w-full' name='pass' onChange={handlechange} required />
                                </div>
                                <div>
                                    <label className='text-[11px] font-bold text-[#777E83]'>CONFIRM PASSWORD</label><br />
                                    <input type='password'
                                        placeholder='*****'
                                        className='bg-[#F0F3F4] px-4 py-2 w-full' name='confirmpass' onChange={handlechange} required />
                                    <br />
                                </div>
                            </div>


                            <div className='flex justify-start items-center mt-5'>
                                <input type='checkbox' className='mx-2' name='termcondition' onChange={handlechange} />
                                <p className='text-sm'>I agree to the Terms of
                                    <span className='text-[#003537] font-bold'>Service</span>
                                    and
                                    <span className='text-[#003537] font-bold'>Privacy Policy</span>.
                                </p>
                            </div>
                            <div className='flex justify-center items-center mt-5'>
                                <input type='submit' value='Create' className='bg-[#003537] text-white px-4 py-2 rounded-sm' />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup