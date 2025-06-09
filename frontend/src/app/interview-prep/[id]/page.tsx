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
import QuestionService from '@/services/question.service';
import { title } from 'process';
import { CircleAlert, ListCollapse } from 'lucide-react';
import AIResponsePreview from '@/components/AIResponsePreview';
import SkeletonLoader from '@/components/SkeletonLoader';
import Drawer from '@/components/modals/Drawer';
import SpinnerLoader from '@/components/SpinnerLoader';
import { toast } from 'sonner';

const page = () => {
  const params = useParams();
  const id = params.id as string;
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.session.currentSession);
  const sessionService = SessionService;
  const questionService = QuestionService;
  const [openLearnMore, setOpenLearnMore] = React.useState(false);
  const [explaination, setExplaination] = React.useState<{ tittle: string, explaination: string }>({ tittle: "", explaination: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = React.useState(false);
  const [exlainLoader,setExplainLoader] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const getSessions = async ()=>{
    try {
      setIsLoading(true)
      const res = await sessionService.getSingleSession(id);
      dispatch(setCurrentSession(res.session));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const generateContentExplaination = async (question: string) => {
    setErrorMsg("");
    setExplainLoader(true);
    setOpenLearnMore(true);
    setExplaination({ tittle: "", explaination: "" });
    const res = await questionService.generateExplaination(question);
    if (res) {
      setExplaination({ tittle: res.data.title, explaination: res.data.explanation });
      setExplainLoader(false);
    }
  }

  const togglePinQuestion = async (questionId: string) => {
    let res = await questionService.togglePin(questionId);
    if(res){
      toast.success("Questions added successfully", {
          description: "You can find them in the list below.",
          duration: 3000,})
        getSessions();
      getSessions();
    }
  }

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      const aiRes = await questionService.generateQuestions({
        role: session?.role as string,
        experience: session?.experience as string,
        topicToFocus: session?.topicToFocus as string,
        numberOfQuestions:10
      })
      const data = aiRes.data
      const res = await questionService.addToSession(data,session?._id as string);
      if(res){
        toast.success("Questions added successfully", {
          description: "You can find them in the list below.",
          duration: 3000,})
        getSessions();
        setIsUpdateLoader(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to load more questions. Please try again later.");
      setIsUpdateLoader(false);
    }
  }

  React.useEffect(() => {
    getSessions();
  }, [id]);


  return (
    <DashboardLayout isLoading={isLoading}>
      <RoleInfoHeader />
      <div className='container mx-auto px-4 py-4 md:px-0 bg-gray'> 
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
                    
                    {!isLoading && session?.questions.length - 1 == index && (
                      <div className='flex items-center justify-center mt-5'>
                        <button className='flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer' 
                          disabled={isLoading || isUpdateLoader}
                          onClick={uploadMoreQuestions}
                        >
                          {isUpdateLoader ? <SpinnerLoader /> : <ListCollapse/>}{" "}Load More 
                        </button>
                      </div>
                    )}
                    </>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <Drawer isOpen={openLearnMore} onClose={setOpenLearnMore} title={isLoading?"":explaination.tittle} >
            {errorMsg && (
              <p className='flex gap-2 text-sm text-semibold text-[#4B7F52]'>
                <CircleAlert/> {errorMsg}
              </p>
            )}
            {exlainLoader && <SkeletonLoader />}
            {!exlainLoader && explaination && (
              <AIResponsePreview content={explaination.explaination} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default page