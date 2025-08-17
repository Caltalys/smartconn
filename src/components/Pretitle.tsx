import { RiStarSFill } from "react-icons/ri"

const Pretitle = ({text, center} : {text?: string, center?: boolean}) => {
  return (
    <div className={`flex items-center gap-3 mb-4 ${center && "justify-center"}`}>
        {/* <div className="w-2 h-2 bg-secondary"></div> */}
        <RiStarSFill className="w-6 h-6 text-secondary mb-1"/>
        {text && <p className="font-primary font-bold align-baseline text-sm lg:text-md tracking-[3.2px] uppercase">{text}</p>}
        <RiStarSFill className="w-6 h-6 text-secondary mb-1"/>
        {/* <div className="w-2 h-2 bg-secondary"></div> */}
    </div>
  )
}

export default Pretitle