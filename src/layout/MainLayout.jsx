import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-black'>
      <Navbar />
      <main className='max-w-7xl mx-auto px-6'>
        <ScrollToTop/>
        <Outlet/>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
