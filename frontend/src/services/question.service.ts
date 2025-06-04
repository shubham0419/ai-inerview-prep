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
  

}