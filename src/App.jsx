import React from 'react'
import Navbar from './components/Navbar'
import NavRoute from './routes/NavRoute'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='min-h-screen bg-black'>
      <Navbar />
      <main className='max-w-7xl mx-auto px-6'>
        <NavRoute />
      </main>
      <Footer />
    </div>
  )
}

export default App