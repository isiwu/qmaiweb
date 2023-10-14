import classNames from "classnames";

type AppProps = {
  text: string
  className?: string,
  handleClick?: () => void,
  disabled?: boolean,
}
const CertificateButton = ({text, className, handleClick, disabled=false}: AppProps) => {
  return (
    <button className={classNames(`${className} py-2 px-9 text-center rounded-md`, {
      "opacity-80 hover:cursor-not-allowed": disabled
    })} onClick={handleClick} disabled={disabled}>{text}</button>
  )
};

export default CertificateButton;