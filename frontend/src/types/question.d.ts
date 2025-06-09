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
  data:QuestionsType[]
}

declare type QuestionsType = {question:string,answer:string}

declare type AddtoSessionRes = {
  questions:Question[]
}

declare type explainQuestionRes = {
  data:{title:string,
  explanation:string}
}

declare type questionResType  = {
  question:Question
}