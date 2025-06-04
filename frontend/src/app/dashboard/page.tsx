"use client"
import SummaryCard from '@/components/cards/SummaryCard'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { clearCurrentSession, setAllSessions } from '@/lib/features/sessionSlice'
import { RootState } from '@/lib/store'
import SessionService from '@/services/session.service'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from "moment"
import { CARD_BG } from '@/Constants/dataConstant'
import SessionCreate from '@/components/modals/SessionCreate'

const page = () => {
  const router = useRouter();
  const sessionService = SessionService;
  const dispatch = useDispatch();

  const [openCreateModal,setOpenCreateModal] = useState(false);
  const sessions = useSelector((state:RootState)=>state.session.allSessions);

  const [openDeleteAlert,setOpenDeleteAlert] = useState<{open:boolean,data:Session | null}>({
    open:false,
    data:null
  })

  const fetchAllSessions = async ()=>{
    try {
      const res = await sessionService.getAllSessions();
      dispatch(setAllSessions(res.sessions));
    } catch (error) {
      console.error(error);
    }
  }

  const deleteSession = async (sessionData:any)=>{
    try {
      const res = await sessionService.deleteSession(sessionData);
      dispatch(clearCurrentSession());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchAllSessions();
  },[])

  return (
    <DashboardLayout>
      <div className='container mx-auto pt-4 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
          {sessions.map((data,index)=>(
            <SummaryCard
              key={data._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicToFocus || ""}
              experience={data?.experience || "-"} 
              questions={data?.questions?.length || 0} 
              description={data?.description || ""} 
              lastUpdated={data?.updatedAt?moment(data.updatedAt).format("DD MMM YYYY"): ""}
              onSelect={()=>router.push(`/interview-prep/${data._id}`)}
              onDelete={()=>setOpenDeleteAlert({open:true,data})}
            ></SummaryCard>
          ))}
        </div>
        <SessionCreate/>
      </div>
    </DashboardLayout>
  )
}

export default page