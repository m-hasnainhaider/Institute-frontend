'use client'
import { MdCollectionsBookmark } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { TbCertificate } from "react-icons/tb";
import { IoEye } from "react-icons/io5";
import styles from "./dashboard.module.css"
import { GlobalContext } from "@/contextApi/rootContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import API from "@/services/api";
function StudentDashboard() {
    let { user } = useContext(GlobalContext);
    let [enrolled_data, setenrolled_data] = useState([])
    useEffect(() => {
        if (user) {
            API.post(`/get-all-enrolled-courses/${user.id}`).then((res) => {
                if (res.status === 200) {
                    setenrolled_data(res.data);
                    console.log(res.data);
                }
            })
        }

    }, [user])//when the user value changes the useEffect will trigger.
    return (
        <>
            <div className="bg-[#F8F9FB] px-2">

                <div className="flex justify-between items-center sm:p-10">
                    <div>
                        {
                            user && (
                                <h1 className="text-2xl font-bold">Welcome {user.name}</h1>
                            )
                        }

                        <p>Here is the overview Of your lerning journy</p>
                    </div>
                    <button className="bg-[#003345] text-white text-sm px-5 py-2 rounded-lg">
                        Courses
                    </button>
                </div>



                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:px-20">
                    <div className="bg-[#F1F3F5] p-5 rounded-2xl">
                        <div className="bg-[#BFE8FF] text-[#184656] w-12 h-12 
                        text-3xl flex justify-center items-center rounded-lg">
                            <i><MdCollectionsBookmark /></i>
                        </div>
                        <p>Total Courses</p>
                        <p className="font-bold">8</p>
                    </div>

                    <div className="bg-[#F1F3F5] p-5 rounded-2xl">
                        <div className="bg-[#CEEED1] text-[#3EAD44] w-12 h-12 
                        text-3xl flex justify-center items-center rounded-lg">
                            <i><FaCheckCircle /></i>
                        </div>
                        <p>Completed</p>
                        <p className="font-bold">8</p>
                    </div>
                    <div className="bg-[#F1F3F5] p-5 rounded-2xl">
                        <div className="bg-[#FFDAD6] text-[#BB0014] w-12 h-12 
                        text-3xl flex justify-center items-center rounded-lg">
                            <i><IoMdTime /></i>
                        </div>
                        <p>Pending</p>
                        <p className="font-bold">8</p>
                    </div>
                    <div className="bg-[#F1F3F5] p-5 rounded-2xl">
                        <div className="bg-[#E3E6FD] text-[#5B70FB] w-12 h-12 
                        text-3xl flex justify-center items-center rounded-lg">
                            <i><TbCertificate /></i>
                        </div>
                        <p>Certificates</p>
                        <p className="font-bold">8</p>
                    </div>

                </div>


                <div className={`${styles.courses_table} py-10`}>
                    <table className="mx-auto w-3xl text-center ">
                        <thead>
                            <tr>
                                <th>
                                    Course Name
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    View Certificate
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {
                                enrolled_data.map((value, index) => (
                                    <>
                                        <tr>
                                            <td>{value.course_name}</td>
                                            <td>
                                                {
                                                    value.completion_status ?
                                                        (
                                                            <p className="bg-[#CEEED1] border border-[#3EAD44] rounded-sm">Incomplete</p>
                                                        )
                                                        :
                                                        (
                                                            <p className="bg-[#FFDAD6] border border-red-500 rounded-sm">Incomplete</p>
                                                        )
                                                }

                                            </td>
                                            <td>
                                                {
                                                    value.certificate && (
                                                        <Link href={`http://localhost:8080/Images/${value.certificate}`} target="blank">
                                                            <div className="flex justify-center items-center">
                                                                <i><IoEye /></i>
                                                            </div>
                                                        </Link>
                                                    )
                                                }

                                            </td>
                                        </tr>
                                    </>
                                ))
                            }

                        </tbody>
                    </table>
                </div>



            </div>





        </>
    )
}
export default StudentDashboard;