import React from 'react'

function CourseApplication() {
    return (
        <div>
            <div className="pl-4 my-10">
                <div className="border w-[80%] md:h-[600px] h-[880px] rounded-xl mx-auto ">
                    <div className='pl-4 my-8 text-green2 font-bold text-xl'>
                        <h2>Course Details</h2>
                    </div>

                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 pl-4">

                        <div>
                            <h3 className="text-[#676767] leading-8 font-bold">QUIMA34513</h3>
                            <p className="text-[#828282] font-[300]">Course ID</p>
                        </div>

                        <div>
                            <h3 className="text-[#676767] leading-8 font-bold">Basic Accounting</h3>
                            <p className="text-[#828282] font-[300]">Course Title</p>
                        </div>

                        <div>
                            <h3 className="text-[#676767] leading-8 font-bold">$400</h3>
                            <p className="text-[#828282] font-[300]">Course Application</p>
                        </div>

                        <div>
                            <h3 className="text-[#676767] leading-8 font-bold">$30</h3>
                            <p className="text-[#828282] font-[300]">Course Certificate Amount</p>
                        </div>



                    </div>

                    <div className='pl-4 mt-8'>

                        <p className="text-[#828282]  font-[300] ">Course Information</p>
                        <div>
                            <p className='w-[80%] font-[600] text-[#676767] leading-6 tracking-wide'> Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Quos minus facilis, obcaecati recusandae nesciunt, consequatur itaque, neque dolores excepturi exercitationem
                                repellendus adipisci praesentium mollitia sapiente dolore aperiam aspernatur
                                fuga nisi </p>

                        </div>

                        <div className='mt-6' >
                            <h3 className="text-[#676767] leading-8 font-bold text-[20px]">Management Line (ATP)</h3>
                            <p className="text-[#828282] font-[300]">Course Applicant</p>
                        </div>

                    </div>


                    <div className='grid grid-cols-1 gap-y-4 md:grid-cols-2 place-content-center  place-items-center my-8  ' >
                        <div className='w-full flex justify-center' >
                            <button className="bg-text2 text-[#FFFFFF] font-[700] md:w-[80%] w-[90%] h-[48px] rounded-full hover:drop-shadow-xl">Accept Application</button>
                        </div>

                        <div className='w-full flex justify-center'>
                            <button className="outline-none border-green5 border-2  text-green5 font-[700] md:w-[80%] w-[90%] h-[48px] rounded-full hover:drop-shadow-xl">Decline Application</button>
                        </div>

                    </div>



                </div>

            </div>
        </div>
    )
}

export default CourseApplication
