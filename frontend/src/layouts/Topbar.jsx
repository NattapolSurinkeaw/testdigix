import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Topbar({sidebar, setSidebar}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center w-full h-full px-4">
      <div
        className={`hover:bg-gray-100 hover:rounded-full cursor-pointer ${sidebar === "close" && "transform scale-x-[-1]"} transition-all ease-in-out duration-300`}
        onClick={()=> sidebar === "open" ? setSidebar("close") : setSidebar("open")}
      >
        <KeyboardArrowLeftIcon style={{ fontSize: "36px", color: "rgb(107 114 128)" }} />
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <span className="text-gray-700 text-sm font-medium">
            {user.display_name || user.username}
          </span>
        )}
        <div className="hover:bg-gray-100 hover:rounded-full cursor-pointer transition-all ease-in-out duration-300">
          <AccountCircleIcon style={{ fontSize: "36px", color: "rgb(107 114 128)" }} />
        </div>
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition"
          >
            <LogoutIcon style={{ fontSize: "20px" }} />
            ออกจากระบบ
          </button>
        )}
      </div>
    </div>
  )
}
