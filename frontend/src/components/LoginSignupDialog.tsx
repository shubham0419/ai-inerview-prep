import React, { useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Cookies from "js-cookie"
import { Trash, Upload, User } from 'lucide-react'
import { validateEmail } from '@/lib/helper'
import AuthService from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setUser } from '@/lib/features/userSlice'

const LoginSignupDialog = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [signUp,setSignup] = useState(false);
  const [profilePic,setProfilePic] = useState<File | null>(null);
  const authService =AuthService;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || password.length < 6) {
      setError('Please fill all fields. Password must be at least 6 characters.')
      return;
    }
    if(!validateEmail(email)){
      setError('Invalid email address')
    }
    setError('');
    let profileImageUrl="";
    if(profilePic){
      const imageRes = await authService.uploadImage(profilePic);
      profileImageUrl = imageRes.imageUrl || ""
    }
    const res = await authService.register({name,email,password,profileImageUrl})
    
    const {token,user} = res;
    
    if(token){
      Cookies.set("aitoken",token,{expires:7,secure:true});
      dispatch(setUser(user));
      router.push("/dashboard");
    }
    
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if ( !email || password.length < 6) {
      setError('Please fill all fields. Password must be at least 6 characters.')
      return
    }
    setError('')
    const res = await authService.login({email,password})
    const {token,user} = res;
    if(token){
      Cookies.set("aitoken",token,{expires:7,secure:true});
      dispatch(setUser(user));
      router.push("/dashboard");
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-linear-to-r from-[#C9FFE2] to-[#A0E7E5] cursor-pointer text-black font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
          Login / Sign Up
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-0' >
        <DialogHeader className='flex flex-col items-start pb-5'>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            join us today by filling the form below.
          </DialogDescription>
        </DialogHeader>
          {signUp?<Signup name={name} email={email} password={password} error={error} setSignup={setSignup} 
            setName={setName} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSignup} setProfilePic={setProfilePic}/>:
            <Login email={email} password={password} error={error} setSignup={setSignup} 
            setEmail={setEmail} setPassword={setPassword} handleSubmit={handleLogin}/>}
      </DialogContent>
    </Dialog>
  )
}

type SignupProps = {
  name?: string, email: string, password: string,
  profilePic?:File | null,
  setProfilePic?:React.Dispatch<React.SetStateAction<File | null>>
  setName?: React.Dispatch<React.SetStateAction<string>>, 
  setEmail: React.Dispatch<React.SetStateAction<string>>, 
  setPassword: React.Dispatch<React.SetStateAction<string>>, 
  handleSubmit: (e:React.FormEvent) => void,
  error:string,
  setSignup:React.Dispatch<React.SetStateAction<boolean>>
}

const Signup = ({ name, email, password,error,profilePic,setProfilePic,setSignup, setName, setEmail, setPassword, handleSubmit }: SignupProps) => {

  return <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
      <ProfilePicInput profilePic={profilePic as File | null} setProfilePic={setProfilePic as React.Dispatch<React.SetStateAction<File | null>>} />
      <div className='flex flex-col gap-1'>
        <label className='font-medium' htmlFor="name">Full Name</label>
        <input
          id='name'
          type="text"
          placeholder="Shubham Choudhary"
          value={name}
          onChange={e => setName && setName(e.target.value)}
          className="border rounded-md px-3 py-2"
          required
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label className='font-medium' htmlFor="email">Email</label>
        <input
          id='email'
          type="email"
          placeholder="shubham@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded-md px-3 py-2"
          required
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='font-medium' htmlFor="password">Password</label>
        <input
          id='password'
          type="password"
          placeholder="Min 6 chars"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded-md px-3 py-2"
          minLength={6}
          required
        />
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <button
        type="submit"
        className="bg-black text-white rounded-md px-4 py-2 mt-2"
      >
        Sign Up
      </button>
    </form>
    <div>Already have an account? <span onClick={()=>setSignup(false)} className='underline text-[#96E8BC] cursor-pointer'>login</span></div>
  </>
}

const Login = ({  email, password,error,setSignup, setEmail, setPassword, handleSubmit }: SignupProps) => {
  return <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
      <div className='flex flex-col gap-1'>
        <label className='font-medium' htmlFor="email">Email</label>
        <input
          id='email'
          type="email"
          placeholder="shubham@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded-md px-3 py-2"
          required
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='font-medium' htmlFor="password">Password</label>
        <input
          id='password'
          type="password"
          placeholder="Min 6 chars"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded-md px-3 py-2"
          minLength={6}
          required
        />
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <button
        type="submit"
        className="bg-black text-white rounded-md px-4 py-2 mt-2"
      >
        Login
      </button>
    </form>
    <div>Don't have an account? <span onClick={()=>setSignup(true)} className='underline text-[#96E8BC] cursor-pointer'>signup</span></div>
  </>
}

const ProfilePicInput = ({
  profilePic,
  setProfilePic,
}: {
  profilePic: File | null
  setProfilePic: React.Dispatch<React.SetStateAction<File | null>>
}) => {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
    if(file){
      setProfilePic(file as File);
      const prev = URL.createObjectURL(file);
      setPreview(prev);
      setProfilePic(file)
    }
    
    console.log(preview);
  }

  const handleImageRemove = ()=>{
    setPreview(null);
    setProfilePic(null);
  }

  const onChooseFile = ()=>{
    //@ts-ignore
    inputRef.current.click();
  }

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      {!preview ? (
        <div className='w-20 h-20 flex items-center justify-center bg-green-50 rounded-full relative cursor-pointer'>
          <User size={40} className='text-[#7DD181]'/>
          <button className='w-8 h-8 flex items-center justify-center bg-linear-to-r from-[#7DD181] to-[#B6F9C9] text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
            onClick={onChooseFile}>
            <Upload size={18} className=''/>
          </button>
        </div>
        
      ):<div className='w-20 h-20 flex items-center justify-center bg-green-50 rounded-full relative cursor-pointer'>
        <img
          src={preview}
          alt="Profile Preview"
          className="w-20 h-20 rounded-full object-cover "
        />
        <button onClick={handleImageRemove} className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'>
          <Trash size={18} className=''/>
        </button>
        </div>}
    </div>
  )
}

export default LoginSignupDialog