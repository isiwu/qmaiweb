import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setAlert } from "../../user/userSlice";
import { verifyCertificate } from "../adminSlice";
import CertButton from "./CertButton";


const VerifyCertificate = () => {
  const [certForm, setCertForm] = useState({
    awarding: "",
    certTitle: "",
    certNo: "",
  });
  const status = useAppSelector(state => state.admin.status);
  const error = useAppSelector(state => state.admin.error);
  const certRes = useAppSelector(state => state.admin.certRes);
  const dispatch = useAppDispatch();
  const handleChange = (input: string) => (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCertForm({
      ...certForm,
      [input]: evt.target.value
    });
  };
  const handleVerify = async () => {
    dispatch(setAlert({show: false, status: "completed", message: ""}));
    await dispatch(verifyCertificate(certForm)).unwrap();

    if (error) {
      dispatch(setAlert({show: true, status: "failed", message: certRes}))
      return
    };


    setCertForm({
      awarding: "",
      certTitle: "",
      certNo: "",
    })
  };
  return (
    <div>
      <div className="border rounded-lg lg:w-[90%] w-[90%] pt-2 lg:px-10 px-4 pb-6 mb-8 leading-10">
        <h3 className="text-green2 mb-6 text-[26px]">Verify Certificate</h3>
        <div className="flex lg:flex-row flex-col lg:space-x-3 space-x-0 items-center">
          <div className="flex flex-col">
            <label htmlFor="awarding" className="text-[#828282] text-[18px] font-[400]">Awarding Organisation</label>
            <input type="text" value={certForm.awarding} id="awarding" placeholder="QMie Account Firm" className="placeholder:text-[#272727]  border-2 focus:border-green5 rounded-lg outline-none bg-[#FBFBFB]" onChange={handleChange("awarding")} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cert-title" className="text-[#828282] text-[18px] font-[400]">Certificate Title</label>
            <input type="text" value={certForm.certTitle} id="cert-title" placeholder="Certificate of Achievement" className="placeholder:text-[#272727] bg-[#FBFBFB] border-2 focus:border-green5 rounded-lg outline-none" onChange={handleChange("certTitle")} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cert-number" className="text-[#828282] text-[18px] font-[400]">Certifcate Number</label>
            <input type="text" value={certForm.certNo} id="cert-number" placeholder="QACC1 34******" className="placeholder:text-[#272727] bg-[#FBFBFB] border-2 focus:border-green5 rounded-lg outline-none" onChange={handleChange("certNo")} />
          </div>
          <div className="text-center pt-8">
            <CertButton text={status === "loading"?"Verifing":"Verify"} handler={handleVerify} disabled={(!certForm.awarding || !certForm.certTitle || !certForm.certNo)?true: (status === "loading")?true: false} />
          </div>
        </div>
        <div className="text-center mt-4">{certRes}</div>
      </div>
      <hr className="w-[90%]" />
    </div>
  )
};

export default VerifyCertificate;