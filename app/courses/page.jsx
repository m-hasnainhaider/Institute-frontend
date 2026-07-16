"use client"
import { IoSearchSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { useState, useContext, useEffect } from "react";
import styles from './courses.module.css'
import { FiBox } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { GlobalContext } from "@/contextApi/rootContext";
import API from "@/services/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
function Courses() {
    let { user } = useContext(GlobalContext);
    let router = useRouter();
    const [product_name, setproduct_name] = useState("");
    const [allcategories, setallcategoires] = useState([]);
    const [allCourseCards, setallCourseCards] = useState([]);
    const [allCourseCursor, setallCourseCursor] = useState(null);
    const handlechage = (e) => {
        const { value } = e.target;
        setproduct_name(value);
    }
    const loadMoreCourses = (e) => {
        if (allCourseCursor) {
            API.get(`/more-all-courses/${allCourseCursor}`).then((res) => {
                if (res.status === 200) {
                    setallCourseCards((pre) => ([...pre, ...res.data.allcourses]));
                    console.log(res.data);
                    setallCourseCursor(res.data.cursor);
                }
            })
                .catch((error) => {
                    if (error.response.status === 500) {
                        console.log(error.response.data.message);
                        setallCourseCursor(null);
                    }
                })
        }

    }
    const fetchAllCourses = () => {
        API.get('/all-courses').then((res) => {
            if (res.status === 200) {
                setallCourseCards(res.data.allcourses);
                setallCourseCursor(res.data.cursor);
            }
            else if (res.status === 500) {
                console.log(res.data.message);
                setallCourseCursor(null);
            }
        })
    }
    const fetchCourseByCateoryId = (id) => {
        API.get(`/course-of-category/${id}`).then((res) => {
            if (res.status === 200) {
                setallCourseCards(res.data);
            }
        })
    }
    const handlefind = (e) => {
        e.preventDefault();
        API.post('/search-course', { product_name }).then((res) => {
            if (res.status === 200) {
                setallCourseCards(res.data);
                console.log(res.data);
            }
            else if (res.status === 500) {
                alert(res.data.message);
            }
        })

    }
    const handelEnroll = (id) => {
        if (user) {
            API.post('/enroll', { course_id: id, user_id: user.id }).then((res) => {
                if (res.status === 200) {
                    alert(res.data.message);
                }
                else if (res.status === 500) {
                    alert(res.data.message);
                }
            })
        }
        else {
            router.push('/login');
        }
    }
    useEffect(() => {
        API.get('/all-categories').then((res) => {
            setallcategoires(res.data)
        })
        fetchAllCourses();
    }, [])
    return (
        <>
            <div className="bg-[#F2F4F6] w-full sm:h-[90vh] flex flex-col justify-center py-8">
                <div className="w-full max-w-185 p-2  sm:p-10">
                    <div className="bg-[#6BF6FF] w-42.5 rounded-2xl text-center text-sm">
                        {
                            user ? (
                                <h6 className="text-[#003345] font-bold">Welcome {user.name}</h6>
                            )
                                :
                                (
                                    <h6 className="text-[#003345] font-bold">Welcome</h6>
                                )

                        }
                    </div>
                    <h1 className=" text-4xl sm:text-7xl font-medium text-[#003345]">Master New Skills.</h1>
                    <h1 className=" text-4xl sm:text-7xl font-medium text-[#11C5CE]">Architect Your Future.</h1>
                    <p className="text-[#6A7174] sm:text-[18px] my-3">Access world-class technical training across industrial automation, digital arts, and safety management. Validated by industry leaders.</p>
                </div>

                <form className="grid grid-cols-1 sm:grid-cols-12 px-2 sm:px-9">
                    <div className="bg-[#FFFFFF] sm:col-span-10 px-8  flex items-center 
                    border-2 border-transparent focus-within:border-[#11C5CE] 
                    focus-within:ring-2 focus-within:ring-[#11C5CE]/20 
                    rounded-lg transition-all duration-200">
                        <IoSearchSharp className="mr-3 text-lg text-[#72797E]" />
                        <input type='text'
                            value={product_name}
                            onChange={handlechage}
                            placeholder="Search for Courses"
                            className="border-none w-full focus:outline-none bg-transparent"
                        />
                    </div>
                    <div className="sm:col-span-2 mx-auto">
                        <button
                            className="flex p-3 bg-[#003345] text-white font-medium rounded-lg"
                            onClick={handlefind}
                        >
                            Find Course
                            <FaArrowRight className="ml-2 mt-1.5" />
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-[#F8F9FB] grid grid-cols-1 sm:grid-cols-12 sm:px-5">
                <div className="hidden sm:block sm:col-span-3 py-3">
                    <div className="sticky top-25">
                        <h5 className="font-bold text-lg text-[#023446]">Course Categories</h5>
                        <ul className={`${styles.course_list} text-sm lg:text-[17px]`}>
                            <li onClick={fetchAllCourses}>All</li>
                            {
                                allcategories && (
                                    allcategories.map((value, index) => (
                                        <li
                                            key={index}
                                            onClick={() => { fetchCourseByCateoryId(value.id) }}
                                        >
                                            {value.name}
                                        </li>
                                    ))
                                )
                            }
                        </ul>


                        <div className="bg-[#003345] p-4 rounded-2xl text-center relative overflow-hidden ">
                            <div className=" relative z-10">
                                <h3 className="text-white font-medium text-lg">Need Guidance?</h3>
                                <p className="my-1 text-[#7AB2CD] text-sm lg:text-[17px]">Book a free consultation with our career counselors to find your path.</p>
                                <button className="bg-[#11C5CE] font-medium p-2 rounded-lg mt-2 w-full text-sm lg:text-[17px]">Contact Advisor</button>
                            </div>

                            <div className="text-8xl text-[#336F82] z-1 absolute bottom-0 -right-10">
                                <FiBox />
                            </div>
                        </div>
                    </div>


                </div>


                <div className="sm:col-span-9">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-3">
                        {
                            allCourseCards && (
                                allCourseCards.map((value, index) => (

                                    <div className="rounded-2xl overflow-hidden " key={index}>
                                        <div className={`${styles.card_img_div} `}>
                                            <h6 className="bg-[#6BF6FF] inline px-2 text-sm rounded-2xl absolute top-6 left-6 z-1">
                                                {value.heroText}
                                            </h6>
                                            <Image
                                                // src={`http://localhost:8080/Images/${value.image}`}
                                                src={`https://institute-backend-production.up.railway.app/Images/${value.image}`}
                                                alt='card_Image'
                                                fill
                                            />

                                        </div>
                                        <div className="bg-white p-5">
                                            <h2 className="text-[#004B63] font-bold text-lg">{value.name}</h2>
                                            <p className="text-[#4A5255] text-sm sm:text-[15px]">{value.discription}</p>
                                            <div className="flex items-center gap-2 text-sm">
                                                <FaRegClock />
                                                <p>{`${value.duration} ${value.fee_structure}s`}</p>
                                                <MdOutlineVerified className="text-[20px]" />
                                                <p>Certified</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <Link href={`/course-details/${value.id}`}>
                                                    <p className="underline decoration-2 underline-offset-5 text-[#004B63] font-medium cursor-pointer text-sm">
                                                        View Details
                                                    </p>
                                                </Link>

                                                <button
                                                    className="bg-[#BB0014] text-sm text-white p-1 rounded-lg"
                                                    onClick={() => { handelEnroll(value.id) }}
                                                >
                                                    Enroll Now
                                                </button>

                                            </div>
                                        </div>
                                    </div>

                                ))
                            )
                        }







                    </div>
                    {
                        allCourseCursor && (
                            <div className="flex justify-center py-10">
                                <button
                                    className="bg-[#E3E4E7] px-10 py-3 rounded-lg flex justify-center items-center text-[#326A7D] font-medium"
                                    onClick={loadMoreCourses}
                                >Load More Courses<IoIosArrowDown className="ml-2 mt-1" /></button>
                            </div>
                        )
                    }


                </div>
            </div>
            <div className="lg:px-20 bg-[#F8F9FB] py-10">
                <div className="bg-[#003345] grid grid-cols-1 sm:grid-cols-2 p-10 rounded-2xl">
                    <div>
                        <h2 className="text-2xl text-white font-medium">Authenticity Matters.Verify Your Credentials.</h2>
                        <p className="text-[#83BAC8]">Already completed a course? Instantly verify your certificate status through our secure global portal.</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <form className="bg-[#1A4757] rounded-sm flex justify-between p-1 sm:w-87.5">
                            <input type='text' placeholder="Certificate ID" className="ml-5 placeholder:text-white" />
                            <input type='submit' value='Verify Now' className="bg-[#11C5CE] px-4 py-1 rounded-sm" />
                        </form>
                        <h6 className="text-sm text-[#7B959E]">Authorized by the global technical board</h6>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Courses;