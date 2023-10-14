import { SetStateAction } from "react";

type AppProps = {
  audit: {
    [index: string]: string
  }
  closeModal: React.Dispatch<SetStateAction<boolean>>
}
const ViewAuditModal = ({audit, closeModal}: AppProps) => {

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 drop-shadow-2xl overflow-auto">
      <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96">
        <div className="flex items-center justify-center">
          <div className="pt-3 pb-7 bg-[#FFFFF5] rounded-lg animate-fadeIn w-[50%]">
            <div className="flex justify-end">
              <div className="flex items-center justify-center">
                <span className="text-4xl mr-5 hover:cursor-pointer" onClick={() => closeModal(false)}>&times;</span>
              </div>
            </div>
            <div className="px-28 mt-2 text-center">
              <div className="flex flex-col divide-y-2">
                <p className="text-[#272727]  text-[24px] font-[500]">Name</p>
                <p className="text-[#828282] text-[18px] font-[500]">{audit.name.charAt(0).toUpperCase() + audit.name.slice(1).toLowerCase()}</p>
              </div>
              <div className="flex flex-col divide-y-2">
                <p className="text-[#272727] text-[24px] font-[500]">Description</p>
                <p className="text-[#828282] text-[18px] font-[500]">{audit.name.charAt(0).toUpperCase() + audit.name.slice(1).toLowerCase()}</p>
              </div>
              <div className="flex flex-col divide-y-2">
                <p className="text-[#272727] text-[24px] font-[500]">Document</p>
                <p className=""><img src={audit.doc} alt="" className="" /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ViewAuditModal;