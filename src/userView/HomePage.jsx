import React from 'react'
import Header from '../userComponents/Header'
import Carousel from '../userComponents/Carousel'
import Categories from '../userComponents/Categories'
import TopItems from '../userComponents/TopItems'
import NewItems from '../userComponents/NewItems'
import Footer from '../userComponents/Footer'

function HomePage() {
  return (
     <div className="w-screen h-screen flex flex-col">
      <header className="shrink-0">
        <Header />
      </header>
      <main className="overflow-y-auto grow bg-gradient-to-b from-[#f5f7fa] to-[#c3cfe2] ">
        <Carousel />
        <div className="mt-8">
          <Categories />
        </div>
        <div className='mt-8'>
          <TopItems />
        </div>
        <div className='mt-8'>
          <NewItems />
        </div>
        <footer>
        <div>
          <Footer />
        </div>
      </footer>
      </main>
      
    </div>
  )
}

export default HomePage
