"use client";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import RoleInfoHeader from '@/components/RoleInfoHeader';
import { setCurrentSession } from '@/lib/features/sessionSlice';
import { RootState } from '@/lib/store';
import { cn } from '@/lib/utils';
import SessionService from '@/services/session.service';
import { useParams } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from "motion/react"
import QuestionCard from '@/components/cards/QuestionCard';

const page = () => {
  const params = useParams();
  const id = params.id as string;
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.session.currentSession);
  const sessionService = SessionService;
  const [openLearnMore, setOpenLearnMore] = React.useState(false);

  const getSessions = async ()=>{
    try {
      const res = await sessionService.getSingleSession(id);
      dispatch(setCurrentSession(res.session));
    } catch (error) {
      console.error(error);
    }
  }

  const generateContentExplaination = async (question: string) => {
    
  }

  const togglePinQuestion = async (questionId: string) => {
    
  }

  React.useEffect(() => {
    getSessions();
  }, [id]);


  return (
    <DashboardLayout>
      <RoleInfoHeader />
      <div className='container mx-auto px-4 py-4 md:px-0'>
        <h2 className='text-lg font-semibold text-black'>Interview Q & A</h2>
        <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
          <div className={cn("col-span-12",openLearnMore ? "md:col-span-7" : "md:col-span-8")}>
            <AnimatePresence>
              {session?.questions.map((data,index)=>{
                return (
                  <motion.div 
                    key = {data._id || index}
                    initial={{opacity:0,y:-20}}
                    animate={{opacity:1,y:0}}
                    exit={{opacity:0,y:20}}
                    transition={{
                      duration:0.4,
                      type:"spring",
                      stiffness:100,
                      delay:index*0.1,
                      damping:15
                    }}
                    layout
                    layoutId={`question--${data._id || index}`}
                  >
                    <>
                      <QuestionCard
                        key = {data._id || index}
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() => 
                          generateContentExplaination(data?.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => togglePinQuestion(data._id)}
                      />
                    </>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default page