import CertButton from "./CertButton";

const EditCertificate = () => {
  return (
    <div>
      <div className="border rounded-lg w-[80%] pt-2 px-7 pb-6 mb-8">
        <h3 className="text-green2 mb-6 text-[26px]">Add New Certificate</h3>
        <div className="flex lg:flex-row flex-col lg:space-x-3 space-x-0 lg:leading-none leading-[2.5rem]">
          <div className="flex flex-col">
            <label htmlFor="awarding" className="text-[#828282] text-[18px] font-[400]">Awarding Organisation</label>
            <input type="text" name="" id="awarding" placeholder="Q Mie Account Firm" className="placeholder:text-[#272727] border-2 focus:border-green5 rounded-lg outline-none bg-[#FBFBFB]" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cert-title" className="text-[#828282] text-[18px] font-[400]">Certificate Title</label>
            <input type="text" name="" id="cert-title" placeholder="Certificate of Achievement" className="placeholder:text-[#272727] bg-[#FBFBFB] border-2 focus:border-green5 rounded-lg outline-none" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cert-number" className="text-[#828282] text-[18px] font-[400]">Certifcate Number</label>
            <input type="text" name="" id="cert-number" placeholder="QACC1 34******" className="placeholder:text-[#272727] bg-[#FBFBFB] border-2 focus:border-green5 rounded-lg outline-none" />
          </div>
        </div>
        <div className="flex flex-col my-6">
          <label htmlFor="cert-content" className="text-[#828282] text-[18px] font-[400]">Content Of Certificate</label>
          <textarea name="cert-content" id="cert-content" cols={1} rows={6} className="placeholder:text-[#272727] bg-[#FBFBFB] border-2 focus:border-green5 rounded-lg outline-none resize-none pl-4 pt-2 caret-green4 w-[100%]"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos." />
        </div>
        <div className="text-center">
          <CertButton text="Save" />
        </div>
      </div>
      <hr className="w-[80%]" />
    </div>
  )
};

export default EditCertificate;