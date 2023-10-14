import classNames from 'classnames'
import React from 'react'
import { useAppSelector } from '../app/hooks'
type AppProps = {
    icon?: JSX.Element,
  text?: string,
  handleClick?: (text: string) => (evt: React.MouseEvent) => void
  disabled?: boolean,
}
const DashboardItem = ({icon,text, disabled=false, handleClick}: AppProps) => {
  const user = useAppSelector(state => state.user.data);

  return (
    <div className={classNames('flex flex-col justify-center items-center border-[1px] border-[#CCCCCC] w-[148px] h-[156px] rounded-md', {
      "hover:border-[#32ba32] hover:text-[#32ba32]   hover:shadow-xl transition-[2s] hover:cursor-pointer group": !disabled,
      "hover:cursor-not-allowed": disabled
    })} onClick={!disabled?handleClick?handleClick(text):() => {}:() => {}}>
          <span className='text-[#4A4A4A] text-3xl group-hover:text-[#32ba32]'>
              {icon}
          </span>
          <span className='pt-2 text-[#4A4A4A] text-center group-hover:text-[#32ba32]'>
              {text}
          </span>
    </div>
  )
}

export default DashboardItem
