import React from 'react'
import { NavLink } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'
import { Home, MessageSquare, Image, LogOut } from 'lucide-react'

const navItems = [
  { to: '/ai', label: 'AI Chat', Icon: MessageSquare },
  { to: '/image', label: 'Image Generator', Icon: Image },
  { to: '/home', label: 'Home', Icon: Home }
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center
      max-sm:absolute top-14 bottom-0
      ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'}
      transition-all duration-300 ease-in-out`}>

      <div className="my-7 w-full">
        <img src={user?.imageUrl} alt="User avatar" className="w-14 rounded-full mx-auto" />
        <h1 className="mt-1 text-center">{user?.fullName}</h1>

        <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded
                ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div onClick={openUserProfile} className="flex gap-2 items-center cursor-pointer">
          Profile
        </div>
        <LogOut
          onClick={signOut}
          className="w-5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Sidebar
