import React from 'react'
import Button from '../../../components/Button'
import { RiErrorWarningFill } from "react-icons/ri"
function AddNewCourse() {
    return (
        <div className="pl-4 my-10">
            <div className="border w-[80%] lg:h-[560px] h-[820px]  rounded-xl mx-auto">


                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-x-4 mt-6 pl-4 pr-2">

                    <div>
                        <div>
                            <p className="text-[#828282] font-[300]">Course ID</p>
                        </div>
                        <div className="pt-2">
                            <input type="text" placeholder="QUMIA3453" className="border-none w-[100%]  h-[40px] outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]" />
                        </div>
                    </div>

                    <div>
                        <div>
                            <p className="text-[#828282] font-[300]">Course Name</p>
                        </div>
                        <div className="pt-2">
                            <input type="text" placeholder="Accounting Basic" className="border-none w-[100%]  h-[40px] outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]" />
                        </div>
                    </div>

                    <div>
                        <div>
                            <p className="text-[#828282] font-[300]">Course Certification Amount</p>
                        </div>
                        <div className="pt-2">
                            <input type="number" placeholder="$5000" className="border-none w-full md:w-[80%] h-[40px] outline-none  hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]" />
                        </div>
                    </div>

                </div>


                <div className='mt-8 pl-4 w-full'>

                    <div className='text-[#CCCCCC] flex items-center'>
                        <p className='text-[#828282]'><RiErrorWarningFill /></p>
                        <p>Your name will appear this way on your membership certificate, if you wish to change it you can do that  </p>


                    </div>
                    <p className=''>by <span className='text-[#73D942] hover:cursor-pointer'>Updating your Profile </span> </p>
                </div>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-x-3 pr-2 mt-10'>
                    <div className='pl-4 w-full'>
                        <p>Select Membership Type</p>
                        <select className='w-full h-[40px] rounded-md outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] text-[#272727] mt-2' >

                            <option >ATP Membership</option>
                        </select>
                    </div>
                    <div className='pl-4'>

                        <div>
                            <p className="text-[#828282] font-[300]">Course Application Amount</p>
                        </div>
                        <div className="pt-2 ">
                            <input type="number" placeholder="$5000" className="border-none w-full md:w-[60%] h-[40px] outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]" />
                        </div>
                    </div>
                </div>

                <div className='pl-4 mt-4'>

                    <p className="text-[#828282] font-[300] ">Course Information</p>
                    <div>
                        <textarea className="bg-[#FBFBFB] p-4 mt-2 resize-none md:w-[67%] w-[90%] h-[120px] outline-none focus:border-2 rounded-md focus:border-green6"
                            placeholder='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos minus facilis, obcaecati recusandae nesciunt, consequatur itaque, neque dolores excepturi exercitationem repellendus adipisci praesentium mollitia sapiente dolore aperiam aspernatur fuga nisi'>
                        </textarea>
                    </div>

                </div>


                <div className='flex justify-center items-center my-8 w-[100%] md:w-[50%] mx-auto ' >
                    <Button text='Save Course' />
                </div>



            </div>

        </div>
    )

}

export default AddNewCourse
