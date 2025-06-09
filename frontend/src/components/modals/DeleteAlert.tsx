import React, { SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import SessionService from '@/services/session.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setDeleteCount } from '@/lib/features/sessionSlice';

const DeleteAlert = ({id,open,setOpen}:{id:string,open:boolean,setOpen:React.Dispatch<SetStateAction<boolean>>}) => {
  const sessionService = SessionService;
  const dispatch = useDispatch()

  const handleDelete = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    try {
      const res = await sessionService.deleteSession(id);
      if (res) {
        setOpen(false);
        toast.success('Session deleted successfully',{
          duration:4000
        });
        dispatch(setDeleteCount())
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.warning("Failed to delete session. Please try again later.",{
        description: "If the problem persists, contact support.",
        duration: 4000,
      });
    }
    setOpen(false);
   
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className='text-shadow-sm'>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your session.
        </DialogDescription>
      </DialogHeader>
      <div className='flex justify-end items-center gap-4'>
        <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow-md'
          onClick={handleDelete}>
          Confirm
        </button>
        <button className='bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 shadow-md'
          onClick={(e) => {e.stopPropagation(); setOpen(false)}}>
          Cancel
        </button>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default DeleteAlert