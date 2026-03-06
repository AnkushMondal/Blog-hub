import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../features/auth/authSlice'
import authService from '../../../appwrite/auth'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout())
    }).catch((error) => console.log(error))
  }
  
  return (
    <button 
      className='px-6 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-indigo-600 rounded-full transition-all duration-300 shadow-md hover:shadow-indigo-200' 
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}

export default LogoutButton