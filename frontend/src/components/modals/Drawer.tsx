import { cn } from '@/lib/utils';
import { UserX, X } from 'lucide-react';
import React, { SetStateAction } from 'react'

interface DrawerProps {
  isOpen: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  title?: string;
  children: React.ReactNode;
}

const Drawer = ({isOpen,onClose,title,children}:DrawerProps) => {
  return (
    <div className={cn('fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] p-4 overflow-y-auto transition-transform bg-white mw-full md:w-[40vw] shadow-2xl shadow-cyan-800/10 border-r border-l-gray-800',
      isOpen ? 'translate-x-0' : 'translate-x-full')}
      tabIndex={-1}
      aria-labelledby='drawer-right-label'>
        <div className='flex items-center justify-between mb-4'>
          <h5 className='flex items-center text-base font-semibold text-black' id='drawer-right-label'>{title}</h5>
          <button className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 w-8 h-8 inline-flex items-center justify-center'
            onClick={() => onClose(false)}>
              <X/>
          </button>
        </div>
        <div className='text-sm mx-3 mb-6'>{children}</div>
      
    </div>
  )
}

export default Drawer