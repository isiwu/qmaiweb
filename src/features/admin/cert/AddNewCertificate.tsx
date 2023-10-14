import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setAlert } from "../../user/userSlice";
import { addCertificate } from "../adminSlice";
import CertButton from "./CertButton";

const AddNewCertificate = () => {
  const [certForm, setCertForm] = useState({
    awarding: "",
    certTitle: "",
    certNo: "",
    content: "",
  });
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.admin.error);
  const status = useAppSelector(state => state.admin.status);
  const handleChange = (input: string) => (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCertForm({
      ...certForm,
      [input]: evt.target.value
    })
  }
  const handleSave = async () => {
    dispatch(setAlert({show: false, status: "completed", message: ""}));
    await dispatch(addCertificate(certForm)).unwrap();
    if (error) return;

    dispatch(setAlert({show: true, status: "completed", message: "new certificate added"}));

    setCertForm({
      awarding: "",
      certTitle: "",
      certNo: "",
      content: "",
    })
  }
  return (
    <div>
      <div className="border rounded-lg lg:w-[80%] w-[90%] pt-2 lg:px-7 px-4 pb-6 mb-8">
        <h3 className="text-green2 mb-6 text-[26px]">Add New Certificate</h3>
        <div className="flex lg:flex-row flex-col lg:space-x-3 space-x-0 lg:leading-none leading-[2.5rem]">
          <div className="flex flex-col">
            <label htmlFor="awarding" className="text-[#828282] text-[18px] font-[400]">Awarding Organisation</label>
            <input type="text" value={certForm.awarding} id="awarding" placeholder="Q Mie Account Firm" className="placeholder:text-[#272727] border-2 focus:border-green5 rounded-lg outline-none bg-[#FBFBFB]" onChange={handleChange("awarding")} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cert-title" className="text-[#828282] text-[18px] font-[400]">Certificate Title</label>
            <input type="text" value={certForm.certTitle} id="cert-title" placeholder="Certificate of Achievement" className="placeholder:text-[#272727] bg-[#FBFBFB] border-2 focus:border-green5 rounded-lg outline-none" onChange={handleChange("certTitle")} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cert-number" className="text-[#828282] text-[18px] font-[400]">Certifcate Number</label>
            <input type="text" value={certForm.certNo} id="cert-number" placeholder="QACC1 34******" className="placeholder:text-[#272727] bg-[#FBFBFB] border-2 focus:border-green5 rounded-lg outline-none" onChange={handleChange("certNo")} />
          </div>
        </div>
        <div className="flex flex-col my-6">
          <label htmlFor="cert-content" className="text-[#828282] text-[18px] font-[400]">Content Of Certificate</label>
          <textarea value={certForm.content} id="cert-content" cols={1} rows={6} className="placeholder:text-[#272727] bg-[#FBFBFB] border-2 focus:border-green5 rounded-lg outline-none resize-none pl-4 pt-2 caret-green4 w-[100%]"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos." onChange={handleChange("content")} />
        </div>
        <div className="text-center">
          <CertButton text={(status === "loading"?"Saving":"Save")} handler={handleSave} disabled={(!certForm.awarding || !certForm.certTitle || !certForm.certNo || !certForm.content)? true: (status === "loading")?true: false} />
        </div>
      </div>
      <hr className="w-[80%]" />
    </div>
  )
};

export default AddNewCertificate;