import React from 'react'

export const ApplyMembership = () => {
  return (
    <div>
          <div className='border-[1px] w-[80%] h-[800px] border-[#CCCCCC] rounded-[16px] my-6  mx-auto'>
            
        <div>
            <div >
              <p className='text-[#32ba32] font-bold text-2xl py-2 px-4 flex-col justify-center items-center'>Profile Record</p>
              <p className='border-b-[1px] w-full'></p>
            </div>
              
              <div>
            <div  className='flex' >

              <div >
                  <img src="/assets/avatar.svg" alt="" className='w-40 h-40' />
                </div>
        <div className=" px-2 mt-4  w-full h-screen">
                    <div className="pt-6 flex items-center  ">
                        <p className="text-[#828282] text-xl ">Academic Record</p>
                        <p className='border-b-[1px] w-[77%] ml-2 border-[#CCCCCC]'></p>
                      
                    </div>
              

            <div className='flex mt-6 '>
              <div className=' flex flex-col'>
                    <label >First Name</label>
                    <input type="text" placeholder='Oluwaseyi' className='border-0 w-[216px] h-[40px] mt-2 outline-none hover:outline-[#32ba32] rounded-[8px] bg-[#FBFBFB] '/>
              </div>
                
              <div className=' flex flex-col pl-8'>
                  <label >Last Name</label>
                  <input type="text" placeholder='James' className='border-0 w-[216px] h-[40px] mt-2 outline-none hover:outline-[#32ba32] rounded-[8px] bg-[#FBFBFB]'/>
              </div>
            </div>
              
              <div className="flex justify-between items-center pt-6">
                    
                    
                  
                  <div className=' flex flex-col'>
                      <label >Email</label>
                      <input type="email" placeholder='Oluwaseyi@gmail.com' className='border-0 w-[216px] mt-2 outline-none hover:outline-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] '/>
                      </div>

                  <div className=' flex flex-col pr-10'>
                      <label >Phone Number</label>
                      <input type="text" placeholder='+234667798098' className='border-0 w-[216px] mt-2 outline-none hover:outline-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] '/>
                      </div>

                  <div className=' flex flex-col'>
                      <label >Date Of Birth</label>
                      <input type="date" placeholder='23/03/2022' className='border-0 w-[216px] mt-2 outline-none hover:outline-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] '/>
                      </div>

              </div>
              <div className="pt-6 flex items-center ">
                  <p className="text-[#828282] text-xl ">Academic Record</p>
                  <p className='border-b-[1px] w-[77%] ml-4 border-[#CCCCCC]'></p>
                
              </div>
            <div>
              <div className='flex items-center space-x-4 pt-6'>
                    <div className=''>
                      <div>
                        <label >Highest Education/Academic Degree</label>

                      </div>
                      <div>
                        <input type="text" placeholder='B.Sc' className='border-0 w-[216px] mt-2 outline-none hover:outline-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] '/>

                      </div>
                  </div>
                      
                    <div className=''>
                      <div>
                        <label >Discipline</label>
                      </div>

                      <div>
                    <input type="text" placeholder='Accounting' className='border-0 w-[216px] mt-2 outline-none hover:outline-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] '/>

                      </div>
                    
                  </div>
                      
                    <div className='pl-12'>
                      <div>
                      <label >Awarding Institution</label>
                      </div>
                      <div>
                    <input type="text" placeholder='IMT' className='border-0 w-[216px] mt-2 outline-none hover:outline-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] '/>

                      </div>
                    
                </div>
                  

        
              </div>
                  <div className='flex justify-end mt-4'>
                      <button   className=' w-[216px] mt-2 border-[1px] outline-none text-[#32ba32] border-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] '>Add More Academic Record</button>   
                  </div>
          </div>
              

                  <div className="pt-6 flex items-center ">
                      <p className="text-[#828282] text-xl ">Work Experience</p>
                      <p className='border-b-[1px] w-[77%] ml-4 border-[#CCCCCC]'></p>
            
                  </div>
                    <div>
                      <div className="flex justify-between items-center pt-6">
            <div className=' flex flex-col'>
                <label >Lastest Work Place</label>
                <input type="text" placeholder='IMT' className='border-0 w-[216px] mt-2 outline-none hover:outline-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] '/>
                </div>
                  

            <div className=' flex flex-col pr-6'>
                <label >Job Title</label>
                <input type="text" placeholder='Internal Auditor' className='border-0 w-[216px] mt-2 outline-none hover:outline-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] '/>
                </div>
                  

            <div className=' flex flex-col'>
                <label >End Date</label>
                <input type="date" className='border-0 w-[216px] mt-2 outline-none hover:outline-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] '/>
                </div>
                  

                      </div>
                      <div className='flex justify-end mt-4'>
                      <button   className=' w-[216px] mt-2 border-[1px] outline-none text-[#32ba32] border-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] '>Add More Work Experience</button>   
                      </div>
              </div>
          
                    
          
            </div>
              </div>
                </div>
              
              
        </div>
     
      </div> 
    </div>
  )
}
