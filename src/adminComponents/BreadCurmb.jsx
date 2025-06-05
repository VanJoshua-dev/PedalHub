import React from 'react'
import { IoMdArrowDropright } from "react-icons/io";
function BreadCurmb(props) {
  return (
    <div className='w-full h-5 flex items-center mb-2'>
        <p className='w-60 flex flex-row gap-2 items-center'><a href="/dashboard" className='hover:underline'>{props.text1}</a> » <a href="">{props.text2}</a></p>
    </div>
  )
}

export default BreadCurmb
