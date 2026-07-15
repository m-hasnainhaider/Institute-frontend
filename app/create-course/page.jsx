'use client'
import styles from './create-course.module.css'
import { useState, useEffect } from 'react'
import { IoTrashBinSharp } from "react-icons/io5";
import API from '@/services/api';
function CreateCourse() {

    const [formdata, setformdata] = useState({
        courseName: '',
        images: [null, null],
        heroText: '',
        topics: [],
        courseDuration: '1',
        feeStructure: 'Month',
        fee: '',
        cardDescription: '',
        extensiveDescription: '',
        courseCategory: { name: '', isnew: false }
    })
    const [dropDownCourseCategory, setdropDownCourseCategory] = useState('');
    const [temptopic, settemptopic] = useState('');
    const [allcategories, setallcategories] = useState('');
    let handlechange = (e) => {
        let { name, type, value, checked } = e.target;
        setformdata((pre) => ({ ...pre, [name]: type === 'checkbox' ? checked : value }));
    }
    let handleimg = (e) => {
        let { name } = e.target;
        let file = e.target.files[0];
        if (name === 'cardImage') {
            setformdata((pre) => {
                let newarray = [...pre.images];
                newarray[0] = file;
                return ({ ...pre, images: newarray })
            })
        }
        else if (name === 'bannerImage') {
            setformdata((pre) => {
                let newarray = [...pre.images];
                newarray[1] = file;
                return ({ ...pre, images: newarray });
            })
        }
    }
    let handletemptopic = (e) => {
        let { name, value } = e.target;
        settemptopic(value);

    }
    let handleTopics = (e) => {
        if (temptopic.trim()) {
            setformdata((pre) => {
                let newarray = [...pre.topics, temptopic];
                return ({ ...pre, topics: newarray });
            })
            settemptopic('');
        }
    }
    let handleDeleteTopic = (deleteIndex) => {
        let newarray = formdata.topics.filter((_, index) => index !== deleteIndex);
        setformdata((pre) => ({ ...pre, topics: newarray }));
    }
    let handlecategory = (e) => {
        let { value } = e.target;
        setdropDownCourseCategory(value);
        if (value === 'Other') {
            setformdata((pre) => (
                {
                    ...pre,
                    courseCategory: { ...pre.courseCategory, name: '', isnew: true }
                }
            ))

        }
        else {
            setformdata((pre) => (
                {
                    ...pre,
                    courseCategory: { ...pre.courseCategory, name: value, isnew: false }
                }
            ))
        }

    }
    let handlenewcategory = (e) => {
        let { value } = e.target;

        setformdata((pre) => (
            {
                ...pre,
                courseCategory: { ...pre.courseCategory, name: value }
            }
        ))
    }
    let handlesubmit = (e) => {
        e.preventDefault();
        console.log(formdata.images)
        const Formdata = new FormData();
        Formdata.append('courseName', formdata.courseName)
        Formdata.append('heroText', formdata.heroText)
        Formdata.append('topics', JSON.stringify(formdata.topics))
        Formdata.append('courseDuration', formdata.courseDuration)
        Formdata.append('feeStructure', formdata.feeStructure)
        Formdata.append('fee', formdata.fee)
        Formdata.append('cardDescription', formdata.cardDescription)
        Formdata.append('extensiveDescription', formdata.extensiveDescription)
        Formdata.append('courseCategory', JSON.stringify(formdata.courseCategory))
        formdata.images.forEach((value, _) => {
            if (value) {
                Formdata.append('images', value);
            }
        })
        API.post('/create-course', Formdata).then((res) => {
            if (res.status === 200) {
                alert(res.data.message);
            }
            else if (res.status === 500) {
                alert(res.data.message);
            }

        })
        console.log(formdata);
        setformdata({
            courseName: '',
            images: [null, null],
            heroText: '',
            topics: [],
            courseDuration: '1',
            feeStructure: 'Month',
            fee: '',
            cardDescription: '',
            extensiveDescription: '',
            courseCategory: { name: 'Technical', isnew: false }
        })
    }
    useEffect(() => {
        API.get('/all-categories').then((res) => {
            setallcategories(res.data);
            if (res.data.length <= 0) {
                setdropDownCourseCategory('Other')
                setformdata((pre) => ({
                    ...pre,
                    courseCategory: { name: '', isnew: true }
                }));
            }
            else{
                setdropDownCourseCategory(res.data[0].name)
                setformdata((pre) => ({
                    ...pre,
                    courseCategory: { name:res.data[0].name, isnew: false }
                }));
            }
        })
    }, [])
    return (
        <>
            <div className="bg-[#003537] py-5">
                <h1 className="text-white font-medium text-center text-3xl">Create Course</h1>
            </div>
            <div>

                <form onSubmit={handlesubmit} className="px-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
                        <div className="flex flex-col mx-auto">
                            <label className="text-[#004F53] text-sm font-bold">
                                Course Name
                            </label>
                            <input
                                type='text'
                                className="bg-[#E7E8EA] w-62.5 h-8 rounded-sm"
                                onChange={handlechange}
                                value={formdata.courseName}
                                name='courseName'
                            />
                        </div>
                        <div className="flex flex-col mx-auto">
                            <label className="text-[#004F53] text-sm font-bold">
                                Card Image
                            </label>
                            <input
                                type='file'
                                className="bg-[#E7E8EA] w-62.5 h-8 pt-1 px-1 rounded-sm"
                                name='cardImage'
                                onChange={handleimg}
                            />
                        </div>
                        <div className="flex flex-col mx-auto">
                            <label className="text-[#004F53] text-sm font-bold">
                                Banner Image
                            </label>
                            <input
                                type='file'
                                className="bg-[#E7E8EA] w-62.5 h-8 pt-1 px-1 rounded-sm"
                                name='bannerImage'
                                onChange={handleimg}
                            />
                        </div>
                        <div className="flex flex-col mx-auto">
                            <label className="text-[#004F53] text-sm font-bold">
                                Hero Text
                            </label>
                            <input
                                type='text'
                                className="bg-[#E7E8EA] w-62.5 h-8 rounded-sm"
                                name='heroText'
                                value={formdata.heroText}
                                onChange={handlechange}
                            />
                        </div>
                        <div className="flex flex-col mx-auto row-span-2">
                            <lable className="text-[#004F53] text-sm font-bold">
                                Course Topics
                            </lable>
                            <div className="bg-[#E7E8EA] w-62.5 rounded-sm ">
                                <div className="flex flex-col">
                                    <input
                                        type='text'
                                        className="bg-white m-2 h-8"
                                        name='topics'
                                        value={temptopic}
                                        onChange={handletemptopic}
                                    />
                                    <input type='button' value='Add' className="bg-[#004F53] py-1 text-white mx-2" onClick={handleTopics} />


                                </div>
                                <div className={`mx-2 h-22 ${styles.list_div}`}>
                                    <ul className="list-decimal pl-5">
                                        {
                                            formdata.topics.map((value, index) => (
                                                <li key={index}>
                                                    <div className='flex justify-between items-center'>
                                                        <span>{value}</span>
                                                        <button
                                                            className='text-[#004F53]'
                                                            type='button'
                                                            onClick={() => { handleDeleteTopic(index) }}>
                                                            < IoTrashBinSharp />
                                                        </button>
                                                    </div>

                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mx-auto">
                            <label className="text-[#004F53] text-sm font-bold">
                                Course Duration
                            </label>
                            <input
                                type='number'
                                className="bg-[#E7E8EA] w-62.5 h-8 rounded-sm"
                                min={1}
                                value={formdata.courseDuration}
                                name='courseDuration'
                                onChange={handlechange}
                            />
                        </div>
                        <div className="flex flex-col mx-auto">
                            <label className="text-[#004F53] text-sm font-bold">
                                Fee Structure
                            </label>
                            <select className="bg-[#E7E8EA] w-62.5 h-8 px-3"
                                value={formdata.feeStructure}
                                name='feeStructure'
                                onChange={handlechange}
                            >
                                <option>
                                    Month
                                </option>
                                <option>
                                    Week
                                </option>
                                <option>
                                    Day
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col mx-auto">
                            <label className="text-[#004F53] text-sm font-bold">
                                Fee
                            </label>
                            <input
                                type='text'
                                className="bg-[#E7E8EA] w-62.5 h-8 rounded-sm"
                                value={formdata.fee}
                                name='fee'
                                onChange={handlechange}
                            />
                        </div>
                        <div className="flex flex-col mx-auto">
                            <lable className="text-[#004F53] text-sm font-bold">
                                Card Description
                            </lable>
                            <textarea
                                rows={4}
                                className="bg-[#E7E8EA] w-62.5 rounded-sm"
                                value={formdata.cardDescription}
                                name='cardDescription'
                                onChange={handlechange}
                            // required
                            />
                        </div>
                        <div className="flex flex-col mx-auto">
                            <lable className="text-[#004F53] text-sm font-bold">
                                Extensive Description
                            </lable>
                            <textarea
                                rows={4}
                                className="bg-[#E7E8EA] w-62.5 rounded-sm"
                                name='extensiveDescription'
                                value={formdata.extensiveDescription}
                                onChange={handlechange}
                            // required

                            />
                        </div>
                        {/* Course Category & Category Name - Side by side, full width */}
                        <div className="flex flex-col mx-auto w-full">
                            <div className="flex gap-2 flex-col mx-auto ">
                                <div className="flex flex-col flex-1">
                                    <label className="text-[#004F53] text-sm font-bold">
                                        Course Category
                                    </label>
                                    <select
                                        className="bg-[#E7E8EA] w-62.5 h-8 px-2 rounded-sm"
                                        value={dropDownCourseCategory}
                                        name='courseCategory'
                                        onChange={handlecategory}
                                    >
                                        {
                                            allcategories &&
                                            allcategories.map((value, index) => {
                                                return (<option key={index}>{value.name}</option>)
                                            })

                                        }
                                        <option>Other</option>
                                    </select>
                                </div>
                                {
                                    formdata.courseCategory.isnew && (
                                        <div className="flex flex-col flex-1">
                                            <label className="text-[#004F53] text-sm font-bold">
                                                Category Name
                                            </label>
                                            <input
                                                type='text'
                                                className="bg-[#E7E8EA] w-62.5 h-8 rounded-sm"
                                                value={formdata.courseCategory.name}
                                                onChange={handlenewcategory}
                                                required
                                            />
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <input type='submit' value='Create Course' className='bg-[#003537] text-white px-5 py-1 rounded-sm' />
                    </div>
                </form>
            </div>
        </>
    )
}
export default CreateCourse