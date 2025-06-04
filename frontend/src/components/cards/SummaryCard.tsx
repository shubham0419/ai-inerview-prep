import { getInitials } from '@/lib/helper'
import { Trash2 } from 'lucide-react'

interface SummaryCardProps {
  colors: string
  role: string
  topicsToFocus: string
  experience: string
  questions: number
  description: string
  lastUpdated: string
  onSelect: () => void
  onDelete: () => void
}

const SummaryCard = ({ colors, role, topicsToFocus, experience, questions, description, lastUpdated, onSelect, onDelete }: SummaryCardProps) => {
  return (
    <div className='bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group' onClick={onSelect}>
      <div className='rounded-lg cursor-pointer p-4 relative'
        style={{ background: colors }}>
        <div className='flex items-start'>
          <div className='flex-shrink-0 h-12 w-12 bg-white rounded-full flex items-center justify-center mr-4'>
            <span className='text-lg font-semibold text-black'>
              {getInitials(role)}
            </span>
          </div>

          {/* content container */}
          <div className='flex-grow'>
            <div className='flex justify-between items-start'>
              <div>
                <h2 className='capitalize text-[17px] font-semibold'>{role}</h2>
                <p className='text-xs'>{topicsToFocus}</p>
              </div>
            </div>
          </div>
        </div>
        <button className='hidden group-hover:flex items-center gap-2 text-xs text-rose-500 bg-rose-50 px-4 py-2 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0'
          onClick={(e) => { e.stopPropagation(); onDelete() }}>
          <Trash2 size={20}/>
        </button>
      </div>
      <div className='px-3 pb-3 '>
        <div className='flex items-center gap-3 mt-3'>
          <div className='text-[11px] text-black font-semibold px-3 py-1 border-[0.5px] border-gray-900 rounded-full'>
            Experience : {experience} {experience == "1" ? "Year" : "Years"}
          </div>
          <div className='text-[11px] text-black font-semibold px-3 py-1 border-[0.5px] border-gray-900 rounded-full'>
            {questions} Q&A
          </div>
          <div className='text-[11px] text-black font-semibold px-3 py-1 border-[0.5px] border-gray-900 rounded-full'>
            Last updated : {lastUpdated}
          </div>
        </div>
        <p className='capitalize text-[14px] text-gray-500 font-medium line-clamp-2 mt-3'>
          {description}
        </p>
      </div>
    </div>
  )
}

export default SummaryCard