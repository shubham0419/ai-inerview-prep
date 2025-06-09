import API_CONSTANTS from "@/Constants/apiConstant";
import axios from "./axios.service";


export default class QuestionService {

  static generateQuestions = (payload:createQuestionsPayload) => {
    return new Promise<createQuestionsRes>(async (resolve, reject) => {
      try {
        const res = await axios.post(API_CONSTANTS.generateQuestions,payload);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as createQuestionsRes);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

  static generateExplaination = (question:string)=>{
    return new Promise<explainQuestionRes>(async (resolve, reject) => {
      try {
        const res = await axios.post(API_CONSTANTS.generateExplaination,{question});
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as explainQuestionRes);
      } catch (error: any) {
        return reject(error);
      }
    });
  }
  
  static togglePin = (id:string) => {
    return new Promise<questionResType>(async (resolve, reject) => {
      try {
        const res = await axios.get(API_CONSTANTS.pinQuestion.replace("<ID>",id));
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as questionResType);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

  static updateNote = (id:string, note:string) => {
    return new Promise<questionResType>(async (resolve, reject) => {
      try {
        const res = await axios.post(API_CONSTANTS.updateNote.replace("<ID>",id),{note});
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as questionResType);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

  static addToSession = (questions:QuestionsType[],sessionId:string) => {
    return new Promise<questionResType>(async (resolve, reject) => {
      let payload = {
        questions,
        sessionId
      }
      try {
        const res = await axios.post(API_CONSTANTS.addToSession,payload);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as questionResType);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

}