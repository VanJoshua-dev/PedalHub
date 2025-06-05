import React from 'react'
import bg from '../assets/landingPagebackground.png'
function PageError() {
  return (
    <div 
    className='w-screen h-screen flex justify-center items-center'
     style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
            }}>
    
        <h1 className='text-3xl text-white text-center'>404 PAGE NOT FOUND ☹️</h1>
      
    </div>
  )
}

export default PageError
