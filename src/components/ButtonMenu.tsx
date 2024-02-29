export const ButtonMenu: React.FC<{title:string, desc:string, Icon:React.FC}> = ({title, desc, Icon}) => {
  return (
    <div className="text-left">
    <button className="block w-full max-w-[500px] mx-auto border-2 rounded-xl hover:bg-slate-100 transition group/item py-4 px-12">
      <div className="flex items-center">
       <div className="basis-11/12">
         <div className="flex items-center mb-2">
          <Icon/>
           <span className="ml-3 font-bold text-xl text-gray-600">{title}</span>
         </div>
         <p className="text-left text-sm">{desc}</p>
       </div>
        <div className="basis-1/12 invisible group-hover/item:visible">
          <svg
            width="19"
            height="32"
            viewBox="0 0 19 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
          >
            <path
              d="M3 3L16 16L3 29"
              stroke="#BEBEBE"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  </div>
  )
}
