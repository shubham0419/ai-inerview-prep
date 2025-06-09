import React from 'react'
import Navbar from '../Navbar'
import SpinnerLoader from '../SpinnerLoader'

const DashboardLayout = ({children,isLoading}:{children:React.ReactNode,isLoading?:boolean}) => {
  return (
    <>
      <Navbar/>
      <div className='bg-gray-50/50 relative min-h-screen'>
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
            <SpinnerLoader size={36}/>
          </div>
        )}
        {children}
      </div>
    </>
  )
}

export default DashboardLayout