import React from 'react'
import profile from '../assets/sampleProfile.png'

import { IoSearchOutline } from "react-icons/io5";
function AdminHeader() {
  return (
    <div className='w-full h-full flex justify-between items-center'>
      <form
      className='flex flex-row' 
      action=""
      >
        {/* <div>
            <input 
            className='border-2 px-2 h-8 w-70 text-sm border-gray-500 rounded-sm'
            placeholder='Search'
            type="search"  />
        </div>
        <button 
        className='w-15 rounded-sm bg-gray-200 ml-2 flex justify-center items-center hover:bg-gray-400'
        type="submit"><IoSearchOutline size={20}/></button> */}
        <h1 className='text-2xl'>Admin Panel</h1>
      </form>

      <div className='flex items-center justify-center gap-2'>
        <img src={profile} alt="" className='w-10' />
        <p>Van Joshua</p>
      </div>
    </div>
  )
}

export default AdminHeader
