import classNames from "classnames";

type AppProps = {
  children: React.ReactNode, 
  scale?: boolean,
  setCloseModal?: React.Dispatch<React.SetStateAction<boolean>>,
}
const TableActionModal = ({children, scale=false, setCloseModal}: AppProps) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-transparentBlack overflow-y-scroll">
      <div className={classNames("relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", {"animate-slideDown": !scale})}>
        <div className="flex items-center justify-center">
          <div className={classNames("bg-[#FDFDFD] rounded-lg pt-3 pb-8 px-8 max-w-[50%]", {"animate-fadeIn": scale})}>
            <div className="text-end"><span className="text-4xl cursor-pointer" onClick={() => setCloseModal(false)}>&times;</span></div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default TableActionModal;