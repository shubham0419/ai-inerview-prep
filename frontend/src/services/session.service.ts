import API_CONSTANTS from "@/Constants/apiConstant";
import axios from "./axios.service";


export default class SessionService {
  static getAllSessions = () => {
    return new Promise<AllSessionsRes>(async (resolve, reject) => {
      try {
        const res = await axios.get(API_CONSTANTS.getAllSessions);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as AllSessionsRes);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

  static createSession = (payload:createSessionPayload) => {
    return new Promise<SingleSessionRes>(async (resolve, reject) => {
      try {
        const res = await axios.post(API_CONSTANTS.createSession,payload);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as SingleSessionRes);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

  static getSingleSession = (id:string) => {
    return new Promise<SingleSessionRes>(async (resolve, reject) => {
      try {
        const res = await axios.get(API_CONSTANTS.getOneSession.replace("<ID>",id));
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as SingleSessionRes);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

  static deleteSession = (id:string)=>{
    return new Promise<SingleSessionRes>(async (resolve, reject) => {
      try {
        const res = await axios.delete(API_CONSTANTS.deleteSession.replace("<ID>",id));
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as SingleSessionRes);
      } catch (error: any) {
        return reject(error);
      }
    });
  }

    static generateQuestions = (payload:createQuestionsPayload) => {
    return new Promise<createQuestionsRes>(async (resolve, reject) => {
      try {
        const res = await axios.get(API_CONSTANTS.generateQuestions);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as createQuestionsRes);
      } catch (error: any) {
        return reject(error);
      }
    });
  };
  

}