"use client"
import Link from 'next/link'
import React from 'react'
import ProfileCard from './cards/ProfileCard'

const Navbar = () => {
  return (
    <div className='h-16 bg-white border border-b border-gray-200/50 backdrop:blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30'>
      <div className='container mx-auto flex items-center justify-between gap-5'>
        <Link href="/">
        <h2 className='text-lg md:text-xl font-semibold text-black leading-5'>
          Inerview Prep Ai
        </h2>
        </Link>
        <ProfileCard/>
      </div>
    </div>
  )
}

export default Navbar