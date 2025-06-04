declare type Question = {
  _id: string
  session: string // Session ID
  question: string
  answer: string
  note: string
  isPinned: boolean
  createdAt: string
  updatedAt: string
}

declare type createQuestionsPayload = {
  role:string,
  experience:string,
  topicToFocus:string,
  numberOfQuestions:number
}
declare type createQuestionsRes = {
  data:[
    {question:string,answer:string}
  ]
}