"use client"
import ProfileCard from "@/components/cards/ProfileCard";
import LoginSignupDialog from "@/components/LoginSignupDialog";
import { RootState } from "@/lib/store";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Banner from "../assets/banner/banner.png"
import Image from "next/image";

const APP_FEATURES: { id: number, title: string, description: string }[] = [
  {
    id: 1,
    title: "Tailored Just for You",
    description: "Get interview questions and model answers based on your role. experience, and specific focus areas - no generic practice here."
  },
  {
    id: 2,
    title: "Learn at Your Own Pace",
    description: "Expand answers only when you're ready. Dive deeper into any concept instantly with Al-powered detailed explanations."
  },
  {
    id: 3,
    title: "Capture Your Insights",
    description: "Add personal notes to any question and pin important ones to the top —- making your learning more organized and impactful."
  },
  {
    id: 4,
    title: 'Understand the "Why" Behind Answers',
    description: "Beyond just answers - unlock detailed concept explanations generated by Al, helping you truly master each topic."
  },
  {
    id: 5,
    title: "Save, Organize, and Revisit",
    description: "Easily save your interview sets, organize them neatly in your dashboard, and pick up your preparation right where you left off."
  }
]

export default function Home() {
  const router = useRouter();
  const user = useSelector((state:RootState)=>state.user.user);

  return (
    <>
      <div className="w-full min-h-full bg-[#C9FFE2]/40">
        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          <header className="flex justify-between items-center mb-16">
            <h1 className="text-black font-bold text-xl">Interview Prep AI</h1>
            {user?<ProfileCard/>:<LoginSignupDialog/>}
          </header>
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-[#008000] bg-[#C9FFE2]/40 px-3 py-1 rounded-full border border-[#96E8BC]">
                  <Sparkles size={14} /> AI Powerd
                </div>
              </div>
              <h2 className="text-5xl text-black font-medium mb-6 leading-tight">Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7DD181_0%,_#96E8BC_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">AI-Powerd</span>{" "}
                Learning
              </h2>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way.
                From preparation to mastery - your ultimate interview toolkit is here.
              </p>
              <button onClick={()=>router.push("/dashboard")}
                className="bg-black font-semibold text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg duration-300 hover:text-black hover:bg-[#96E8BC] border hover:border-[#96E8BC] transition-colors cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-full relative z-10">
        <div>
          <section className="flex items-center justify-center -mt-36">
            <Image src={Banner}
              alt="hero-img"
              className="w-[80vw] rounded-lg border-2 border-[#C9FFE2]/40"
            />
          </section>
        </div>
        <div className="w-full min-h-full bg-[#C9FFE2]/40 mt-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="capitalize text-2xl font-medium text-center mb-12">
                Features that make you shine
              </h2>
              <div className="flex flex-col items-center gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div key={feature.id} className="bg-[#f4fcf7] p-6 shadow-sm rounded-xl hover:shadow-md shadow-[#d1f9dc] transition border border-[#d1f9dc]">
                      <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div key={feature.id} className="bg-[#f4fcf7] p-6 shadow-sm rounded-xl hover:shadow-lg shadow-[#d1f9dc] transition border border-[#d1f9dc]">
                      <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
          <div className="text-sm bg-gray-50 text-black font-semibold text-center p-5 mt-5">
            Made with ❤️... Shubham Choudhary
          </div>
        </div>
      </div>
    </>
  );
}
