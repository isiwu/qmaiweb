import React, { useCallback, useState } from "react";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import ApplicationButton from "../../components/MembershipApplication/ApplicationButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addAudit } from "./membershipSlice";
import { setAlert } from "../user/userSlice";

const AddAudit = () => {
  const user = useAppSelector(state => state.user.data);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [auditForm, setAuditForm] = useState({
    name: "",
    info: "",
  });
  const [uploadData, setUpload] = useState({
    file: new File([""], ""),
    preview: "",
  });
  const onDrop = useCallback((files: File[]) => {
    setUpload({
      file: files[0],
      preview: URL.createObjectURL(files[0])
    })
  }, []);
  const {getRootProps, getInputProps} = useDropzone({onDrop});
  const onChange = (input: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.stopPropagation();
    setAuditForm({
      ...auditForm,
      [input]: evt.target.value
    })
  };
  const handleSend = async () => {
    const formData = new FormData();
    formData.append("name", auditForm.name);
    formData.append("info", auditForm.info);
    formData.append("doc", uploadData.file);

    const data = {
      userId: user._id,
      payload: formData,
    };

    setLoading(true);
    dispatch(setAlert({show: false, status: "completed", message: ""}))
    const dataStore = await dispatch(addAudit(data)).unwrap();
    setLoading(false);
    if (!dataStore.status) {
      dispatch(setAlert({show: false, status: "failed", message: "action failed. try again."}))
      return; 
    }

    dispatch(setAlert({show: true, status: "completed", message: "action successful!"}))
    setAuditForm({
      name: "",
      info: "",
    })

    setUpload({
      preview: "",
      file: new File([""], "")
    })
  };

  return (
    <div>
      <div className="pt-8 w-[80%] mx-auto">
        <div className="flex flex-col space-y-1 w-[100%]">
          <label htmlFor="name" className="text-[#676767] font-[400] text-[18px]">Enter Audit Decription Name</label>
          <input value={auditForm.name} type="text" name="" id="name" className="w-full px-3 py-1 bg-[#F9F9F9] focus:border-2 focus:border-green3 outline-none rounded-lg" onChange={onChange("name")} />
        </div>
        <div className="flex flex-col space-y-1 w-[100%] mt-6 mb-8">
          <label htmlFor="info" className="text-[#676767] font-[400] text-[18px]">Enter Brief Audit Information</label>
          <input value={auditForm.info} type="text" name="" id="info" className="w-full px-3 py-1 bg-[#F9F9F9] focus:border-2 focus:border-green3 outline-none rounded-lg" onChange={onChange("info")} />
        </div>
        <label htmlFor="doc" className="text-[#676767] font-[400] text-[18px]">Attached Supporting Document</label>
        <div className={classNames({"h-32": !uploadData.preview})}>
          <div {...getRootProps({
            className: "border-2 border-dashed w-[100%] mt-4 rounded-lg flex flex-col items-center justify-center h-full hover:cursor-pointer text-[20px]"
          })}>
            {/* <label htmlFor="info" className="text-[#676767] font-[400] text-[18px]">Enter Brief Audit Information</label> */}
            <input {...getInputProps()} />
            <p className="font-[400] text-[#A9A9A9] mt-8">Drag supporting document or</p>
            <p className="text-green4 font-[400]">Browse file</p>
            {
              uploadData.preview && <img src={uploadData.preview} alt="" className="my-10 w-[30%]" />
            }
          </div>
        </div>
        <div className="my-14 text-lg text-center">
          <ApplicationButton text={loading?"Sending...":"Send for Review"} handleClick={handleSend} disabled={loading} />
        </div>
      </div>
    </div>
  )
}

export default AddAudit;