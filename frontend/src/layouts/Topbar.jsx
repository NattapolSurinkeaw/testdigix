import { userState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function Topbar({sidebar, setSidebar}) {
    
  return (
    <div>
      <div className="flex justify-between items-center w-full h-full px-4">
      <div
        className={`hover:bg-gray-100 hover:rounded-full cursor-pointer ${sidebar === "close" && "transform scale-x-[-1]"} transition-all ease-in-out duration-300`}
        onClick={()=> sidebar === "open" ? setSidebar("close") : setSidebar("open")}
      >
        <KeyboardArrowLeftIcon style={{ fontSize: "36px", color: "rgb(107 114 128)" }} />
      </div>
      <div className="hover:bg-gray-100 hover:rounded-full cursor-pointer transition-all ease-in-out duration-300">
        <AccountCircleIcon style={{ fontSize: "36px", color: "rgb(107 114 128)" }} />
      </div>
    </div>
    </div>
  )
}
