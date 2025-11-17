import React, {useEffect} from 'react'
import profile from '../assets/sampleProfile.png'

import { IoSearchOutline } from "react-icons/io5";
function AdminHeaders() {
  const user = localStorage.getItem("user")
  return (
    <div className='w-full h-full flex justify-between items-center'>
      <form
      className='flex flex-row' 
      action=""
      >
        <h1 className='text-2xl'>Admin Panel</h1>
      </form>

      <div className='flex items-center justify-center gap-2'>
        <img src={profile} alt="" className='w-10' />
        <p>{user}</p>
      </div>
    </div>
  )
}

export default AdminHeaders
