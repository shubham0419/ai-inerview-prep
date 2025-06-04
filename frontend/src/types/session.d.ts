declare type Session = {
  _id: string
  user: string 
  role: string
  experience: string
  topicToFocus: string
  description?: string
  questions: Question[] 
  createdAt: string
  updatedAt: string
}

declare type createSessionPayload = {
  role: string
  experience: string
  topicToFocus: string
  description?: string
  questions: [{question:string,answer:string}]
}

declare type AllSessionsRes = {
  sessions: Session[]
}

declare type SingleSessionRes = {
  session: Session
}