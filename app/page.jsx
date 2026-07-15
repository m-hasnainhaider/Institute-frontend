'use client'
import styles from './Home.module.css'
import Image from 'next/image';
import { FiAward } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { PiGearSix } from "react-icons/pi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuShieldPlus } from "react-icons/lu";
import { MdOutlineTranslate } from "react-icons/md";
import { MdOutlineToys } from "react-icons/md";
import { IoGlobeOutline } from "react-icons/io5";

export default function Home() {
  
    return (
        <>
            {/* HERO SECTION */}
            <div className={`${styles.hero} flex justify-center items-center`}>

                <div className={`${styles.text_divs} flex flex-wrap items-center justify-center`}>

                    {/* LEFT SIDE */}
                    <div className='w-full md:w-1/2 flex justify-center items-center p-5'>

                        <div className='max-w-162.5  sm:px-9'>

                            <div className={`${styles.hero_first_text} font-medium text-center py-1 mb-4 text-sm sm:text-[17px]`}>
                                <h1>Professional Training Institute</h1>
                            </div>

                            <h1 className='text-4xl md:text-6xl font-bold text-[#004B63] leading-tight'>
                                The Test Institute Of Technology
                            </h1>

                            <p className='text-[#40484C] md:text-[20px] my-5 leading-8'>
                                Bridging the gap between theory and industry excellence.
                                We empower the next generation of technical leaders
                                through immersive, hands-on professional development.
                            </p>

                            <div className='flex flex-wrap gap-4'>
                                <button className='bg-[#BB0014]
                                 text-white 
                                 text-sm 
                                 
                                 px-2
                                 py-1
                                 sm:px-5
                                  sm:py-3
                                   rounded-[10px]
                                    font-medium 
                                    hover:scale-105
                                     duration-300'>
                                    View Courses
                                </button>

                                <button className='bg-white
                                 text-[#004B63] 
                                 text-sm 
                                 
                                  px-2
                                 py-1
                                 sm:px-5
                                  sm:py-3
                                 rounded-[10px]
                                  font-medium 
                                  hover:scale-105
                                   duration-300
                                    shadow-sm'>
                                    Our Certifications
                                </button>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className='w-full md:w-1/2 flex justify-center items-center p-5'>

                        <div className={styles.hero_img_outer}>

                            <Image
                                src="/Homeimages/unnamed.png"
                                alt="hero pic"
                                width={500}
                                height={500}
                                className="w-full h-auto object-cover"
                            />

                            <div className='flex justify-center items-center w-full'>

                                <div className={`${styles.hero_img_text} p-4 rounded-2xl font-medium backdrop-blur-md`}>
                                    <h1 className='text-lg font-semibold'>
                                        ISO 9001:2015 Certified
                                    </h1>

                                    <p className='text-sm'>
                                        Excellence in Technical Education
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* BLUR CIRCLES */}
                <div className={styles.circle_outer}>
                    <div className={styles.hero_circle}></div>
                    <div className={styles.two_hero_circle}></div>
                </div>

            </div>

            {/* CERTIFICATE VERIFICATION */}
            <div className='bg-[#003345] w-full flex justify-center items-center px-4'>

                <div className={`${styles.verify} md:px-20`}>

                    <div className={`${styles.verify_text} w-full md:w-125 py-2 md:py-0 text-center md:text-left`}>

                        <h1 className='text-white font-medium text-2xl'>
                            Certificate Verification
                        </h1>

                        <p className='text-[#33A2D2]'>
                            Validate professional credentials instantly using our secure online verification system.
                        </p>

                    </div>

                    <form className='flex flex-col md:flex-row justify-center items-center gap-3 w-full md:w-auto'>

                        <input
                            type='text'
                            className={`${styles.verify_inputbox} bg-[#255060] px-4 py-3 rounded-md w-full md:w-65`}
                            placeholder='Enter Certificate Number'
                        />

                        <input
                            type='submit'
                            value='Verify Now'
                            className='bg-[#6BF6FF] text-[#002022] font-medium px-5 py-3 rounded-md hover:bg-[#3EDAE3] cursor-pointer w-full md:w-auto'
                        />

                    </form>

                </div>

            </div>

            {/* WHY CHOOSE */}
            <div className={styles.choosing_div}>

                <h1 className='font-bold text-[#003345] text-3xl text-center pt-16'>
                    Why Choose The Test ?
                </h1>

                <div className='w-20 h-1.5 bg-[#BB0014] mx-auto mt-3 rounded-2xl'></div>

                <div className='flex flex-wrap justify-center items-center gap-8 py-14 px-5'>

                    {/* CARD 1 */}
                    <div className={`${styles.choose_card} p-10 rounded-2xl`}>

                        <div className={`${styles.card_icon} bg-[#BFE8FF] text-[#003345]`}>
                            <h1><PiGearSix /></h1>
                        </div>

                        <h1 className='text-[#003345] font-semibold text-lg my-3'>
                            Hands-on Experience
                        </h1>

                        <p className='text-[#9c9b9b]'>
                            Practical training in state-of-the-art labs designed to mirror real-world industrial environments.
                        </p>

                    </div>

                    {/* CARD 2 */}
                    <div className={`${styles.choose_card} p-10 rounded-2xl`}>

                        <div className={`${styles.card_icon} bg-[#6BF6FF] text-[#003345]`}>
                            <h1><FiAward /></h1>
                        </div>

                        <h1 className='text-[#003345] font-semibold text-lg my-3'>
                            Industry Recognized
                        </h1>

                        <p className='text-[#9c9b9b]'>
                            Our certifications are globally recognized, ensuring your skills meet international professional standards.
                        </p>

                    </div>

                    {/* CARD 3 */}
                    <div className={`${styles.choose_card} p-10 rounded-2xl`}>

                        <div className={`${styles.card_icon} bg-[#FFDAD6] text-[#BB0014]`}>
                            <h1><LuGraduationCap /></h1>
                        </div>

                        <h1 className='text-[#003345] font-semibold text-lg my-3'>
                            Flexible Learning
                        </h1>

                        <p className='text-[#9c9b9b]'>
                            Choose between full-time, part-time, and weekend programs designed to fit your professional schedule.
                        </p>

                    </div>

                </div>

            </div>

            {/* FACULTIES */}

            <div className='bg-[#F2F4F6] w-full py-10 px-4 sm:px-10'>

                <div className='mb-3'>
                    <h1 className='text-[#003345] font-bold text-3xl'>Our Specialized Faculties</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-12'>
                        <div className='col-span-10'>

                            <p className='text-[rgb(64,72,76)]'>
                                Explore professional development across our core technical domains.
                            </p>
                        </div>
                        <div className='col-span-2'>
                            <button className='flex justify-center items-center font-medium text-[#003345] whitespace-nowrap'>Browse All<FaLongArrowAltRight className='mx-2' /></button>
                        </div>
                    </div>
                </div>


                <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
                    <div className='lg:col-span-8'>
                        <div className={`${styles.trade_div}`}>
                            <div className='bg-[#003345b4] w-full h-full flex items-center sm:items-end '>
                                <div className='p-2 sm:p-20'>
                                    <h5 className='text-[#5EF6FF] font-bold text-sm'>MOST POPULAR</h5>
                                    <h1 className='text-white font-bold text-3xl'>Technical Trades & Engineering</h1>
                                    <p className='text-[#7da8bb] text-md'>Mechanical, Electrical, and Civil engineering modules focused on industrial precision.</p>
                                    <div className='flex flex-wrap'>
                                        <div className='bg-[#ffffff34] text-white text-sm font-sans w-fit px-4 py-1 rounded-lg'>
                                            <p>HVAC Systems</p>
                                        </div>
                                        <div className='bg-[#ffffff34] text-white text-sm font-sans w-fit px-4 py-1 rounded-lg mx-1'>
                                            <p>Industrial Automation</p>
                                        </div>
                                        <div className='bg-[#ffffff34] text-white text-sm font-sans w-fit px-4 py-1 rounded-lg'>
                                            <p>AutoCAD</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:col-span-4'>
                        <div className={`${styles.trade_card} flex flex-col justify-between p-5`}>
                            <div>
                                <div className={`${styles.card_icon} bg-[#FFDAD6] text-[#BB0014]`}>
                                    <h1><LuShieldPlus /></h1>
                                </div>
                                <h1 className='text-[#003345] font-bold text-2xl my-5'>
                                    Safety & Health
                                </h1>
                                <p className='text-[#40484C]'>
                                    Occupational safety standards including NEBOSH, IOSH, and OSHA certifications.
                                </p>
                            </div>
                            <div className='flex justify-center'>
                                <button className='border-2 px-4 py-1'>
                                    Explore Catagory
                                </button>
                            </div>
                        </div>
                    </div>
                </div>




                <div className='grid grid-cols-1 gap-6 lg:grid-cols-12 my-6'>
                    <div className='lg:col-span-4'>
                        <div className={`${styles.trade_card_second}`}>
                            <div className={`${styles.trade_card_second_inner}  p-5`}>
                                <div className={`${styles.card_icon} bg-[#BBE4F9] text-[#003537]`}>
                                    <h1><LuShieldPlus /></h1>
                                </div>
                                <h1 className='text-[#003345] font-bold text-2xl my-5'>
                                    IT & Software
                                </h1>
                                <p className='text-[#40484C]'>
                                    Full Stack Developement,CyberSecurity and Cloud InfraStructure Certifications.
                                </p>

                            </div>
                        </div>
                    </div>
                    <div className='lg:col-span-8'>
                        <div className={`  w-full sm:h-75 rounded-3xl overflow-hidden relative bg-[#003537] p-10`}>
                            <h1 className='text-[white] font-bold text-2xl'>Professional Skills</h1>
                            <p className='text-[#04686F] text-lg py-2'>Language proficiency, project management, and corporate leadership workshops designed for modern executives.</p>
                            <button className='bg-[#6AF4FD] text-[#003537] px-3 py-2 rounded-lg'>View All Modules</button>
                            <i className='text-[#ffffff93] text-9xl absolute right-0 bottom-0 rotate-330'>< MdOutlineTranslate /></i>
                        </div>
                    </div>

                </div>




            </div>



            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 bg-[#F8F9FB] p-10'>
                <div className='col-span-1 bg-[#EDEEF0] p-10 rounded-2xl flex flex-col justify-between items-start min-h-60 relative overflow-hidden group'>
                    <h6 className='font-bold text-sm text-[#BB0014]'>Digital Presence</h6>
                    <h1 className='font-bold text-2xl'>Premium Domain & Web Services</h1>
                    <p className='text-[#9c9c9c]'>Secure your digital identity with our professional domain registration and specialized hosting solutions.</p>
                    <button className='text-white bg-[#003537] font-medium px-4 py-2 rounded-sm'>Register Domain</button>
                    <i className='absolute -right-6.5 -bottom-6.5 text-9xl rotate-230 text-[#E0E4E7] group-hover:scale-110'><IoGlobeOutline /></i>
                </div>
                <div className='col-span-1 bg-[#E1F2FC] p-10 rounded-2xl flex flex-col justify-between items-start min-h-60 relative overflow-hidden group'>
                    <h6 className='font-bold text-sm'>Education Supply</h6>
                    <h1 className='font-bold text-2xl'>Montessori Educational Material</h1>
                    <p className='text-[#9c9c9c]'>High-quality, certified sensory and educational tools designed for premium Montessori environments.</p>
                    <button className='text-[#003537] bg-[white] font-medium px-4 py-2 rounded-sm'>Order Catalog</button>
                    <i className='absolute -right-6.5 -bottom-6.5 text-9xl  text-[#CADEE9] group-hover:rotate-20'><MdOutlineToys /></i>
                </div>
            </div>






        </>
    );
}
