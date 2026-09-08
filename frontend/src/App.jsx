import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './layouts/Sidebar'
import Topbar from './layouts/Topbar'
import Books from './pages/books/Books'
import Authors from './pages/authors/components/Authors'
import Categories from './pages/categories/Categories'
import Members from './pages/members/Members'

function App() {
  const [sidebar, setSidebar] = useState("open")

  return (
    <>
    <div className="flex items-start w-full h-screen">
        <div
          className={`bg-gradient-to-b from-gray-500 to-gray-900 w-full h-screen ${
            sidebar === "close" ? "max-w-[70px]" : "max-w-[300px]"
          } transition-all ease-in-out duration-300`}
        >
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>
        <div className="flex flex-col w-full h-screen overflow-hidden">
          <div className="w-full h-full max-h-[70px] z-50 shadow-md">
            <Topbar sidebar={sidebar} setSidebar={setSidebar} />
          </div>
          <div className="p-4 h-full overflow-auto bg-gray-100">
            <Routes>
              <Route path="/" element={<Books />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/members" element={<Members />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
