import React from 'react'
import Metrix from './Metrix'
import BreadCurmb from './BreadCurmb'
import Summary from './Summary'
import TopItems from './TopItems'

function AdminMain() {
  return (
    <div className=''>
        <BreadCurmb text1="Home" text2="Dashboard"/>
        <Metrix />
        <div className='flex flex-row items-center justify-center gap-2'>
          <Summary />
          <TopItems />
        </div>
        
    </div>
  )
}

export default AdminMain
