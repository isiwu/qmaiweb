
const TableActionMenu = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="relative after:absolute after:border-8 after:border-r-transparent after:border-b-[#F9F9F9] after:border-l-transparent after:-top-2 after:left-[10%] after:border-t-transparent">
      <div className="absolute top-2 w-44 py-2 bg-[#F9F9F9] -right-1 z-50 rounded-lg pl-3 text-[#307D0B] font-[300] text-[14px] shadow-xl">
        {children}
      </div>
    </div>
  )
}

export default TableActionMenu;