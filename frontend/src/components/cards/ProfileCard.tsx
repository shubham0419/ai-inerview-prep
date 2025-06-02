import { clearUser } from '@/lib/features/userSlice'
import { RootState } from '@/lib/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { UserImg } from '@/Constants/dataCOnstant'

const ProfileCard = () => {
  const user = useSelector((state:RootState)=>state.user.user)
  const dispatch = useDispatch();
  const router = useRouter()
  const handleLogout = async ()=>{
    dispatch(clearUser());
    Cookies.remove('aitoken');
    router.push('/')
  }

  return (
    <div className='flex items-center'>
      <img src={user?.profileImageUrl || UserImg} alt="user.png" className='h-11 w-11 rounded-full mr-3'/> 
      <div className='flex flex-col'>
        <div className='text-[15px] text-black font-bold'>
          {user?.name}
        </div>
        <button onClick={handleLogout} className='flex items-center gap-0.5 text-[#4B7F52] text-sm font-semibold cursor-pointer hover:underline'>
          Logout <LogOut size={14}/>
        </button>
      </div>
    </div>
  )
}

export default ProfileCard