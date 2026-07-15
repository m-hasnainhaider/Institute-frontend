import { FaGlobeAmericas } from "react-icons/fa";
import { CiAt } from "react-icons/ci";
function footer(){
    return (
        <>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 my-9'>
            <div className=''>
                <h1 className='text-[#164E63] font-bold text-2xl'>The Test</h1>
                <p className='text-[#9c9c9c] text-sm'>
                    A premier technical training institute committed to bridging the industrial skill gap with professional excellence.
                </p>
                <button className='bg-[#9c9c9c] text-[#1f708d] mx-1  p-2 rounded-2xl'><FaGlobeAmericas /></button>
                <button className='bg-[#9c9c9c] text-[#1f708d]  mx-1  p-2 rounded-2xl'><CiAt /></button>
            </div>
            <div>
                <h1 className='font-medium text-[#164E63]'>Navigation</h1>
                <ul className='text-[#9c9c9c]'>
                    <li>Privacy Policy</li>
                    <li>Terms Of Service</li>
                    <li>Contact Us</li>
                    <li>Accredation</li>
                    <li>Cerror Support</li>
                </ul>
            </div>
            
            <div>
                <h1 className='font-medium text-[#164E63]'>Contact</h1>
                <ul className='text-[#9c9c9c]'>
                    <li>Suite 302, Technical Plaza, Professional District</li>
                    <li>+1 (234) 567-8900</li>
                    <li>info@thecnex.edu</li>
                </ul>
            </div>

            <div>
                <h1 className='font-medium text-[#164E63]'>Stay Updated</h1>
                <p className='text-[#9c9c9c]'>Join our newsletter for professional insights and course updates.</p>
                <form className='flex justify-center items-center'>
                    <input type="text" placeholder="Enter Email" className='bg-white placeholder:text-silver border-2 py-1.25'/>
                    <input type="submit"  value="Subscribe" className='text-white bg-[#164E63] px-5 py-2'/>
                </form>
            </div>
        </div>
        </>
    )
}

export default footer