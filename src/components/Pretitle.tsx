const Pretitle = ({text, center} : {text: string, center: boolean}) => {
  return (
    <div className={`flex items-center gap-3 mb-4 ${center && "justify-center"}`}>
        <div className="w-2 h-2 bg-secondary"></div>
        <p className="font-primary font-bold text-sm lg:text-md tracking-[3.2px] uppercase">{text}</p>
        <div className="w-2 h-2 bg-secondary"></div>
    </div>
  )
}

export default Pretitle