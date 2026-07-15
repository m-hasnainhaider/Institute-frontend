"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import * as React from "react";
import API from "@/services/api";
function CourseDetails({ params }) {
    const { id } = React.use(params);
    const [allDetail, setallDetail] = useState([]);

    useEffect(() => {
        if (id) {
            API.get(`/course/${id}/details`).then((res) => {
                console.log(res.data);
                setallDetail(res.data[0]);
            })
        }
    }, [id])
    return (
        <>
            <div className="bg-[#0D3B40] p-2 sm:p-20">
                <div className="max-w-2xl flex flex-col gap-4">
                    <div>
                        <p className="bg-[#E1F5EE] inline px-5 rounded-2xl text-sm">
                            {allDetail.hero_text}
                        </p>
                    </div>

                    <h1 className="text-white font-medium text-2xl">
                        {allDetail.name}
                    </h1>
                    <p className="text-[rgba(255,255,255,.65)] text-sm">
                        {
                            allDetail.discription
                        }
                    </p>
                    <div className="text-[rgba(255,255,255,.65)] text-sm">
                        <ul className="flex gap-6 flex-wrap">
                            <li>3 Months</li>
                            <li>28 Enrolled</li>
                            <li>Rawalpindi</li>
                            <li>4.8 rating</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 px-4 gap-4">
                <div className="lg:col-span-10">
                    <Image
                        src={`http://localhost:8080/Images/${allDetail.banner}`}
                        width={500}
                        height={500}
                        alt="Programming code abstract background"
                        className="w-full "
                    />
                    <h1 className="font-medium">About The Course</h1>
                    <p>
                        {allDetail.extensive_description}
                    </p>
                    <h1 className="font-medium">Skills You&apos;ll learn</h1>
                    <ul className="grid grid-col-1 sm:grid-cols-2 ">
                        {
                            allDetail.topics?.map((value, index) => (
                                <li key={index}>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 bg-[#E1F5EE] mx-2 rounded-2xl border border-blue-600">

                                        </div>
                                        <p>
                                            {value}
                                        </p>
                                    </div>
                                </li>
                            ))
                        }


                    </ul>
                </div>
                <div className="lg:col-span-2">
                    <div className="flex flex-col  gap-1 sticky top-25">
                        <h1 className="font-medium text-2xl text-[#0D3B40] ">
                            {allDetail.fee}
                        </h1>
                        <p className="text-sm">
                            {`Per ${allDetail.fee_structure} Fee`}
                        </p>
                        <button className="text-sm bg-[#0D3B40] w-full p-3 text-white">
                            Enroll Now
                        </button>
                        <p className="text-sm text-center">
                            Contact Advisor
                        </p>

                        <div>
                            <div className="flex text-sm justify-between">
                                <p>Duration:</p>
                                <p>{`${allDetail.duration} ${allDetail.fee_structure}'s`}</p>
                            </div>
                            <div className="flex text-sm justify-between">
                                <p>Seates left:</p>
                                <p>3</p>
                            </div>
                            <div className="flex text-sm justify-between">
                                <p>Certificate:</p>
                                <p className="text-[#0D5C63]">Yes, on pass</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseDetails;