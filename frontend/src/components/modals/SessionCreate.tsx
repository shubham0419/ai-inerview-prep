import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import SessionService from '@/services/session.service'
import { useRouter } from 'next/navigation'
import SpinnerLoader from '../SpinnerLoader'
import { cn } from '@/lib/utils'
import QuestionService from '@/services/question.service'

const SessionCreate = () => {
  const sessionService = SessionService;
  const questionService = QuestionService;
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicToFocus: "",
    description: "",
  })
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter()

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { role, experience, topicToFocus } = formData;

    if (!role || !experience || !topicToFocus) {
      setError("Please fill all the fields");
      return;
    }
    setError("");

    const response = await questionService.generateQuestions({role, experience, topicToFocus, numberOfQuestions:10});

    let res = await sessionService.createSession({...formData,questions:response.data});
    if (res.session) {
      router.push(`/interview-prep/${res.session._id}`);
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger className='h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#4B7F52]/80 to-[#96E8BC] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors hover:shadow-2xl hover:shadow-[#96E8BC] fixed bottom-10 md:bottom-20 right-10 md:right-20'>
        <Plus /> Add New
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-0' >
        <DialogHeader className='flex flex-col items-start pb-5'>
          <DialogTitle className='capitalize'>Star a new Interview journey</DialogTitle>
          <DialogDescription className='capitalize text-gray-500'>
            Fill out a few quick details and unlock your personalized set of interview questions!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateSession} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium' htmlFor="role">Target Role</label>
            <input className='px-2 py-2 border border-gray-200 rounded-md' id='role' value={formData.role} type="text" placeholder='e.g., Frontend Developer, FullStack Developer' onChange={(e) => handleChange("role", e.target.value)} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium' htmlFor="exp">Years of Experience</label>
            <input className='px-2 py-2 border border-gray-200 rounded-md' id='exp' value={formData.experience} type="number" placeholder='e.g., 1 Year , 2 Years ,5+ Years' onChange={(e) => handleChange("experience", e.target.value)} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium' htmlFor="topics">Topics to Focus On</label>
            <input className='px-2 py-2 border border-gray-200 rounded-md' id='topics' value={formData.topicToFocus} type="text" placeholder='Comma-Separated, e.g., React, Node.js, MongoDB' onChange={(e) => handleChange("topicToFocus", e.target.value)} />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium' htmlFor="des">Description</label>
            <input className='px-2 py-2 border border-gray-200 rounded-md' id='des' value={formData.description} type="text" placeholder='Any Specific goals or notes for this session' onChange={(e) => handleChange("description", e.target.value)} />
          </div>
          {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
          <button type='submit' className={cn('bg-primary text-white py-2 rounded-md mt-2 flex justify-center gap-2',isLoading && "bg-gray-400")} disabled={isLoading}>
            {isLoading && <SpinnerLoader/>} Create Session
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SessionCreate