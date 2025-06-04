import { RootState } from '@/lib/store'
import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'

const RoleInfoHeader = () => {
  const session = useSelector((state: RootState) => state.session.currentSession)
  return (
    <div className='bg-white relative'>
      <div className='container mx-auto px-10 md:px-0'>
        <div className='h-[200px] flex flex-col justify-center relative z-10'>
          <div className='flex items-start'>
            <div className='flex-grow'>
              <div className='flex justify-between items-start'>
                <div className=''>
                  <h2 className='capitalize text-2xl font-semibold'>{session?.role}</h2>
                  <p className='capitalize text-sm font-medium text-gray-900 mt-1'>{session?.topicToFocus}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-3 mt-4'>
            <div className='text-[11px] font-semibold text-white bg-black px-3 py-1 rounded-full'>
              Experience: {session?.experience} {session?.experience === "1" ? "Year" : "Years"}
              </div>
              <div className='text-[11px] font-semibold text-white bg-black px-3 py-1 rounded-full'>{session?.questions?.length || 0} Q&A</div>
              <div className='text-[11px] font-semibold text-white bg-black px-3 py-1 rounded-full'>Last Updated: {session?.updatedAt ? moment(session.updatedAt).format("DD MMM YYYY") : ""}</div>
          </div>
        </div>
        <div className='w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-white overflow-hidden absolute top-0 right-0 '>
          <div className='w-16 h-16 bg-lime-400 blur-[65px] animate-blob1'/>
          <div className='w-16 h-16 bg-teal-400 blur-[65px] animate-blob2'/>
          <div className='w-16 h-16 bg-cyan-300 blur-[45px] animate-blob3'/>
          <div className='w-16 h-16 bg-fuchsia-200 blur-[45px] animate-blob1'/>
        </div>
      </div>
    </div>
  )
}

export default RoleInfoHeader