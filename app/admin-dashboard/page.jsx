'use client'
import { TbCertificate } from "react-icons/tb";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import styles from './admin-dashboard.module.css'
import { RxCross2 } from "react-icons/rx";
import { MdConnectWithoutContact } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoIosCloudUpload } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import API from "@/services/api";
import React, { useState, useEffect } from "react";
import Link from "next/link";


function AdminDashboard() {
    let router = useRouter();
    const [formdata, setformdata] = useState({ studentname: "", course_id: "all" });
    const [cursor, setcursor] = useState(null);
    const [loadmore, setloadmore] = useState(false);
    const [all_table_data, setall_table_data] = useState([]);
    const [table_heading, settable_heading] = useState("New Application");
    const [total_counts, settotal_counts] = useState(null);
    const [course_list, setcourse_list] = useState([]);
    const [Student_details_id, setStudent_details_id] = useState(null);

    const handleFetchPreviousData = () => {
        API.post(`enrollments-lessthen/${cursor}`).then((res) => {
            setall_table_data(res.data);
            if (res.data.length <= 0) {
                setcursor(null);
            }
        })
    }

    const handelmoreEnrollments = async (e) => {
        e.preventDefault();
        if (!cursor) return;
        try {
            const res = await API.post(`/get-more-enrollments/${cursor}`);
            setall_table_data(prev => [...prev, ...res.data.enrolldata]);
            setcursor(res.data.cursor);
            setloadmore(res.data.loadmore);
        } catch (err) {
            console.log(err.response?.data);
            setcursor(null);
            setloadmore(false);
        }
    };

    const handelAcceptEnrollment = async (id) => {
        await API.post(`/accept-enrollments/${id}`).then((res) => {
            if (res.status === 200) {
                alert(res.data.message);
                handleFetchPreviousData();
                countOfAll()
            }
            else {
                console.log(error.response?.data);
            }
        })
    }

    const handelRejectEnrollment = async (id) => {
        API.post(`/reject-enrollment/${id}`).then((res) => {
            if (res.status === 200) {
                alert(res.data.message);
                handleFetchPreviousData();
                countOfAll()
            }
            else {
                console.log(error.response?.data);
            }
        })
    }

    const getenrollments = () => {
        setall_table_data([]);
        setcursor(null);
        setloadmore(false);
        API.get('/get-all-enrollments').then((res) => {
            if (res.status === 200) {
                setall_table_data(res.data.enrolldata);
                setcursor(res.data.cursor);
                setloadmore(res.data.loadmore);
                settable_heading("New Application");
            }
            else {
                console.log("Unable to fetch all enrollments");
            }
        })
        settable_heading("New Application");
    }

    const getpending = () => {
        setall_table_data([]);
        setcursor(null);
        setloadmore(false);
        API.get('/get-pending-applications').then((res) => {
            if (res.status === 200) {
                setall_table_data(res.data.pendings);
                setcursor(res.data.cursor);
                setloadmore(res.data.loadmore);
                settable_heading("Pending Application");
            }
            else {
                console.log(error.response?.data);
            }
        })
    }

    const getMorePending = () => {
        if (cursor) {
            API.post('/get-more-pending-applications', { cursor }).then((res) => {
                if (res.status === 200) {
                    setcursor(res.data.cursor);
                    setloadmore(res.data.loadmore);
                    setall_table_data((pre) => [...pre, ...res.data.pendings]);
                }
                else {
                    setcursor(null);
                }
            })
        }
    }

    const getCompleted = () => {
        setcursor(null);
        setall_table_data([]);
        API.get('/get-completed-applications').then((res) => {
            if (res.status === 200) {
                setall_table_data(res.data.completed);
                setcursor(res.data.cursor);
                setloadmore(res.data.loadmore);
                settable_heading("Completed Application");
                console.log(res.data);
            }
            else {
                setcursor(null);
                setloadmore(false);
                console.log(error.response?.data);
            }
        })
    }

    const countOfAll = () => {
        API.get('/total-countof-all-tables')
            .then((res) => {
                settotal_counts(res.data);
            })
            .catch((err) => {
                console.error("Backend Error Data:", err.response?.data);
            })
    }

    const handelSearch = (e) => {
        e.preventDefault();
        setloadmore(false);
        const payload = { ...formdata, table_name: table_heading };
        setformdata(payload);
        API.post('/search-student', payload).then((res) => {
            if (res.status === 200) {
                setall_table_data(res.data);
            } else {
                console.log(error.data.message);
            }
        })
        setformdata({ studentname: "", course_id: "all", table_name: "" })
    }

    const handelchange = (e) => {
        let { name, type, value, checked } = e.target;
        setformdata((pre) => ({ ...pre, [name]: type === 'checkbox' ? checked : value }));
    }

    const handelprofileView = (id) => {
        if (Student_details_id === id) {
            return setStudent_details_id(null);
        }
        setStudent_details_id(id);
    }

    const handlecompleted = async (student_id, e) => {
        let file = e.target.files[0];
        let formdata = new FormData();
        formdata.append('file', file);
        formdata.append('student_id', student_id);
        await API.post('/upload-certificate', formdata).then((res) => {
            if (res.status === 200) {
                alert(res.data.message);
                console.log(res.data);
            }
            else {
                console.log(error.response?.data);
                alet("Some thin went Wrong");
            }
        })
        countOfAll();
        getpending();
    }
    const handleUpdateCertificate = async (student_id, e) => {
        let file = e.target.files[0];
        let formdata = new FormData();
        formdata.append('file', file);
        formdata.append('student_id', student_id);
        await API.put('/update-upload-certificate', formdata).then((res) => {
            if (res.status === 200) {
                alert(res.data.message)
            }
            else {
                console.log(error.response?.message);
            }
        })
        getCompleted();
    }

    useEffect(() => {
        API.get('/get-all-enrollments').then((res) => {
            if (res.status === 200) {
                setall_table_data(res.data.enrolldata);
                setcursor(res.data.cursor);
                setloadmore(res.data.loadmore);
            }
            else {
                console.log("Unable to fetch all enrollments");
            }
        })
        countOfAll();
        API.get('/all-courses-list').then((res) => {
            if (res.status === 200) {
                setcourse_list(res.data);
                setloadmore(res.data.loadmore);
            }
            else {
                console.log(error.response?.message);
            }
        })
    }, [])

    return (
        <>
            <div className="bg-[#F8F9FB]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:px-20 pt-10">
                    <div className="bg-[#F1F3F5] p-5 rounded-2xl transition-transform duration-300 ease-in-out hover:-translate-y-3"
                        onClick={() => { router.push('./create-course') }}>
                        <div className="flex justify-between items-center">
                            <div className="bg-[#E3E6FD] text-[#5B70FB] w-12 h-12 
                                text-3xl flex justify-center items-center rounded-lg">
                                <i><TbCertificate /></i>
                            </div>
                        </div>
                        <p>Total Courses</p>
                        <p className="font-bold">
                            {total_counts ? total_counts.number_of_courses : 0}
                        </p>
                    </div>

                    <div className="bg-[#F1F3F5] p-5 rounded-2xl transition-transform duration-300 ease-in-out hover:-translate-y-3"
                        onClick={getCompleted}
                    >
                        <div className="bg-[#CEEED1] text-[#3EAD44] w-12 h-12 
                                text-3xl flex justify-center items-center rounded-lg">
                            <i><FaPeopleGroup /></i>
                        </div>
                        <p>Completed</p>
                        <p className="font-bold">
                            {total_counts ? total_counts.number_of_completed : 0}
                        </p>
                    </div>
                    <div className="bg-[#F1F3F5] p-5 rounded-2xl transition-transform duration-300 ease-in-out hover:-translate-y-3"
                        onClick={getpending}
                    >
                        <div className="bg-[#FFDAD6] text-[#BB0014] w-12 h-12 
                                text-3xl flex justify-center items-center rounded-lg">
                            <i><MdOutlinePendingActions /></i>
                        </div>
                        <p>Pending Application</p>
                        <p className="font-bold">
                            {total_counts ? total_counts.number_of_pendings : 0}
                        </p>
                    </div>
                    <div className="bg-[#F1F3F5] p-5 rounded-2xl transition-transform duration-300 ease-in-out hover:-translate-y-3"
                        onClick={getenrollments}
                    >
                        <div className="bg-[#E3E6FD] text-[#5B70FB] w-12 h-12 
                                text-3xl flex justify-center items-center rounded-lg">
                            <i><MdConnectWithoutContact /></i>
                        </div>
                        <p>New Applicants</p>
                        <p className="font-bold">{total_counts ? total_counts.number_of_enrollments : 0}</p>
                    </div>
                </div>

                <div className=" text-lg px-5 sm:px-40 pt-10 flex justify-around flex-wrap">
                    <h1 className="font-bold">{table_heading}</h1>
                    <form className="flex flex-row gap-3 flex-wrap" onSubmit={handelSearch}>
                        <input
                            type='text'
                            className="bg-[#D9E0E3] placeholder:text-center text-sm"
                            placeholder="Student Name"
                            name='studentname'
                            value={formdata.studentname}
                            onChange={handelchange}
                        />
                        <select className="bg-[#D9E0E3] text-sm" name='course_id'
                            onChange={handelchange}>
                            <option value="all">All Courses</option>
                            {
                                course_list.map((value, index) => {
                                    return (
                                        <option key={value.id || index} value={value.id}>
                                            {value.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        <input type='submit' value='Search' className="bg-[#003537] text-white text-[15px] px-2 rounded-sm" />
                    </form>
                </div>

                {
                    table_heading === 'New Application' && (
                        <div className={`${styles.courses_table}`}>
                            <table className="mx-auto w-3xl text-center max-h-125 overflow-y-auto">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Course</th>
                                        <th>Student Details</th>
                                        <th>approval</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {
                                        all_table_data.length > 0 && all_table_data.map((value, index) => (
                                            <React.Fragment key={value.id || index}>
                                                <tr>
                                                    <td>{value.user_name}</td>
                                                    <td>{value.course_name}</td>
                                                    <td>
                                                        <div className="flex justify-center items-center">
                                                            <i className="text-[20px] text-[#5B70FB]"
                                                                onClick={() => { handelprofileView(value.id) }}
                                                            >
                                                                <RiProfileLine />
                                                            </i>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-around items-center">
                                                            <i className="hover:bg-[#FFDAD6] text-[#BB0014] text-2xl"
                                                                onClick={() => { handelRejectEnrollment(value.id) }}
                                                            >
                                                                <RxCross2 />
                                                            </i>
                                                            <i
                                                                className="hover:bg-[#CEEED1] text-[#3EAD44] text-2xl"
                                                                onClick={() => { handelAcceptEnrollment(value.id) }}
                                                            >
                                                                <IoCheckmarkSharp />
                                                            </i>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {
                                                    Student_details_id === value.id && (
                                                        <tr className="bg-[#003537] text-white">
                                                            <td colSpan={4} className="p-0">
                                                                <table className="w-full">
                                                                    <tbody>
                                                                        <tr className="border-none!">
                                                                            <td><span>Email: </span>{value.email}</td>
                                                                            <td><span>Phoneno: </span>{value.country_code + "-" + value.subscriber_no}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                    {
                                        loadmore && (
                                            <tr key="load-more">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <button
                                                        className="bg-[#D9E0E3] text-[#003537] text-sm px-2 py-1 rounded-lg"
                                                        onClick={handelmoreEnrollments}
                                                    >Load More
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }

                {
                    table_heading === 'Pending Application' && (
                        <div className={`${styles.courses_table}`}>
                            <table className="mx-auto w-3xl text-center max-h-125 overflow-y-auto">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Course</th>
                                        <th>Details</th>
                                        <th>Upload</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {
                                        all_table_data.map((value, index) => (
                                            <React.Fragment key={value.id || index}>
                                                <tr>
                                                    <td>{value.user_name}</td>
                                                    <td>{value.course_name}</td>
                                                    <td>
                                                        <div className="flex justify-center items-center">
                                                            <i className="text-[20px] text-[#5B70FB]"
                                                                onClick={() => { handelprofileView(value.id) }}
                                                            >
                                                                <RiProfileLine />
                                                            </i>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-around items-center">
                                                            <input
                                                                type="file"
                                                                id={`certificate-${value.id}`}
                                                                className="hidden"
                                                                onChange={(e) => handlecompleted(value.id, e)}
                                                            />

                                                            <label htmlFor={`certificate-${value.id}`}>
                                                                <i className="hover:bg-[#E3E6FD] text-[#5B70FB] text-2xl cursor-pointer">
                                                                    <IoIosCloudUpload />
                                                                </i>
                                                            </label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {
                                                    Student_details_id === value.id && (
                                                        <tr className="bg-[#003537] text-white">
                                                            <td colSpan={4} className="p-0">
                                                                <table className="w-full">
                                                                    <tbody>
                                                                        <tr className="border-none!">
                                                                            <td><span>Email: </span>{value.email}</td>
                                                                            <td><span>Phoneno: </span>{value.country_code + "-" + value.subscriber_no}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                    {
                                        loadmore && (
                                            <tr key="load-more-pending">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <button
                                                        className="bg-[#D9E0E3] text-[#003537] text-sm px-2 py-1 rounded-lg"
                                                        onClick={getMorePending}
                                                    >Load More
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }

                {
                    table_heading === 'Completed Application' && (
                        <div className={`${styles.courses_table}`}>
                            <table className="mx-auto w-3xl text-center max-h-125 overflow-y-auto">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Course</th>
                                        <th>Details</th>
                                        <th>Certificate</th>
                                        <th>Upload Certificate</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {
                                        all_table_data.map((value, index) => (
                                            <React.Fragment key={value.id || index}>
                                                <tr>
                                                    <td>{value.user_name}</td>
                                                    <td>{value.course_name}</td>
                                                    <td>
                                                        <div className="flex justify-center items-center">
                                                            <i className="text-[20px] text-[#5B70FB]"
                                                                onClick={() => { handelprofileView(value.id) }}
                                                            >
                                                                <RiProfileLine />
                                                            </i>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-center items-center">
                                                            <Link href={`http://localhost:8080/Images/${value.certificate}`} target="blank">
                                                                <i className="text-[20px]"><IoEye /></i>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-around items-center">
                                                            <input type='file' id={`cv-${value.id}`} className="hidden"
                                                             onChange={(e) => { handleUpdateCertificate(value.id,e)}} />
                                                            <label htmlFor={`cv-${value.id}`}>
                                                                <i className="hover:bg-[#FFDAD6] text-[#BB0014] text-2xl">
                                                                    <IoIosCloudUpload />
                                                                </i>
                                                            </label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {
                                                    Student_details_id === value.id && (
                                                        <tr className="bg-[#003537] text-white">
                                                            <td colSpan={5} className="p-0">
                                                                <table className="w-full">
                                                                    <tbody>
                                                                        <tr className="border-none!">
                                                                            <td><span>Email: </span>{value.email}</td>
                                                                            <td><span>Phoneno: </span>{value.country_code + "-" + value.subscriber_no}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default AdminDashboard