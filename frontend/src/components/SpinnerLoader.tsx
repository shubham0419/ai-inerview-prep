import { Loader } from 'lucide-react'
import React from 'react'

const SpinnerLoader = ({size}:{size?:number}) => {
  return (
    <Loader size={size?size:24} className='animate-spin'/>
  )
}

export default SpinnerLoader